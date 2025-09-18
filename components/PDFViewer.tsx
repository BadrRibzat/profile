// components/PDFViewer.tsx
"use client"; // This directive is crucial for client-side rendering

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
//import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the pdf.js worker only in the browser environment
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}

interface TextItem {
  text: string;
  translatedText: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PDFViewerProps {
  pdfUrl: string;
  pageNumber: number;
  scale: number;
  isTranslateMode: boolean;
  showOverlay: boolean;
  targetLanguage: string;
  originalLanguage: string;
  // Callbacks passed from DocumentViewer
  onDocumentLoadSuccess: (pageCount: number) => void;
  onPageLoadSuccess: () => void;
  // Added for re-triggering parent's loading state
  setTranslationInProgress: (inProgress: boolean) => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  pageNumber,
  scale,
  isTranslateMode,
  showOverlay,
  targetLanguage,
  originalLanguage,
  onDocumentLoadSuccess,
  onPageLoadSuccess,
  setTranslationInProgress, // Now received as a prop
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [pdfDocumentInstance, setPdfDocumentInstance] = useState<any>(null); // Stores the loaded PDF document instance

  // A simplified translation function using a dictionary approach
  // In a production environment, this would be replaced with an API call
  const translateText = useCallback((text: string, targetLang: string, sourceLang: string): string | null => {
    // Skip translation if target language is the same as original or text is empty
    if (targetLang === sourceLang || !text || text.trim() === '') {
      return null;
    }
    
    // Dictionary for common translations
    const translations: Record<string, Record<string, string>> = {
      // Arabic to other languages
      "المملكة المغربية": {
        "en": "Kingdom of Morocco",
        "fr": "Royaume du Maroc",
        "de": "Königreich Marokko",
        "es": "Reino de Marruecos",
        "ja": "モロッコ王国"
      },
      "رخصة السياقة": {
        "en": "Driver's License",
        "fr": "Permis de Conduire",
        "de": "Führerschein",
        "es": "Permiso de Conducir",
        "ja": "運転免許証"
      },
      "وزارة النقل": {
        "en": "Ministry of Transportation",
        "fr": "Ministère du Transport",
        "de": "Ministerium für Verkehr",
        "es": "Ministerio de Transporte",
        "ja": "運輸省"
      },
      "الأصناف": { // Categories
        "en": "Categories",
        "fr": "Catégories",
        "de": "Kategorien",
        "es": "Categorías",
        "ja": "カテゴリ"
      },
      "تاريخ التسليم": { // Date of Delivery/Issue
        "en": "Date of Issuance",
        "fr": "Date de délivrance",
        "de": "Ausstellungsdatum",
        "es": "Fecha de expedición",
        "ja": "交付日"
      },
      "التقييدات": { // Restrictions
        "en": "Restrictions",
        "fr": "Restrictions",
        "de": "Einschränkungen",
        "es": "Restricciones",
        "ja": "制限事項"
      },
      "تاريخ نهاية الصلاحية": { // Expiry Date
        "en": "Expiry Date",
        "fr": "Date de fin de validité",
        "de": "Ablaufdatum",
        "es": "Fecha de vencimiento",
        "ja": "有効期限"
      },
      "الإسم الشخصى": { // First Name
        "en": "First Name",
        "fr": "Prénom",
        "de": "Vorname",
        "es": "Nombre",
        "ja": "名"
      },
      "الإسم العائلي": { // Family Name / Last Name
        "en": "Family Name",
        "fr": "Nom",
        "de": "Nachname",
        "es": "Apellido",
        "ja": "姓"
      },
      "تاريخ الولادة": { // Date of Birth
        "en": "Date of Birth",
        "fr": "Date de naissance",
        "de": "Geburtsdatum",
        "es": "Fecha de nacimiento",
        "ja": "生年月日"
      },
      "رقم الرخصة": { // License Number
        "en": "License Number",
        "fr": "Numéro de permis",
        "de": "Lizenznummer",
        "es": "Número de licencia",
        "ja": "免許証番号"
      },
      "في فاس": { // In Fes
        "en": "in Fes",
        "fr": "à Fès",
        "de": "in Fes",
        "es": "en Fez",
        "ja": "フェズにて"
      },
      "المملكة المغربية": {
        "en": "Kingdom of Morocco",
        "fr": "Royaume du Maroc",
        "de": "Königreich Marokko",
        "es": "Reino de Marruecos",
        "ja": "モロッコ王国"
      },
      "الأصناف": {
        "en": "Categories",
        "fr": "Catégories",
        "de": "Kategorien",
        "es": "Categorías",
        "ja": "カテゴリ"
      },
      "تاريخ التسليم": {
        "en": "Date of delivery",
        "fr": "Date de délivrance",
        "de": "Lieferdatum",
        "es": "Fecha de entrega",
        "ja": "配送日"
      },
      "التقييدات": {
        "en": "Restrictions",
        "fr": "Restrictions",
        "de": "Beschränkungen",
        "es": "Restricciones",
        "ja": "制限事項"
      },
      "رخصة السياقة": {
        "en": "Driving License",
        "fr": "Permis de Conduire",
        "de": "Führerschein",
        "es": "Permiso de Conducir",
        "ja": "運転免許証"
      },
      "شهادة اتمام مساق": {
        "en": "Course Completion Certificate",
        "fr": "Certificat de réussite du cours",
        "de": "Kursabschlusszertifikat",
        "es": "Certificado de finalización del curso",
        "ja": "コース修了証明書"
      },
      "شهادة في أساسيات التسويق الرقمي": {
        "en": "Digital Marketing Fundamentals Certificate",
        "fr": "Certificat en Fondamentaux du Marketing Digital",
        "de": "Zertifikat für Grundlagen des digitalen Marketings",
        "es": "Certificado en Fundamentos de Marketing Digital",
        "ja": "デジタルマーケティングの基礎証明書"
      },
      "بدر ربزات": {
        "en": "Badr Ribzat",
        "fr": "Badr Ribzat",
        "de": "Badr Ribzat",
        "es": "Badr Ribzat",
        "ja": "バドル・リブザット"
      },
      "التقييدات": {
        "en": "Restrictions",
        "fr": "Restrictions",
        "de": "Einschränkungen",
        "es": "Restricciones",
        "ja": "制限"
      },
      // English to other languages
      "Transcript": {
        "fr": "Relevé de notes",
        "de": "Transkript",
        "es": "Expediente",
        "ar": "سجل درجات",
        "ja": "成績証明書"
      },
      "ALX Software Engineering": {
        "fr": "Ingénierie Logicielle ALX",
        "de": "ALX Softwareentwicklung",
        "es": "Ingeniería de Software ALX",
        "ar": "هندسة البرمجيات ALX",
        "ja": "ALX ソフトウェアエンジニアリング"
      },
      "COURSE CERTIFICATE": {
        "fr": "CERTIFICAT DE COURS",
        "de": "KURSZERTIFIKAT",
        "es": "CERTIFICADO DE CURSO",
        "ar": "شهادة دورة",
        "ja": "コース証明書"
      },
      "This is to certify that": {
        "fr": "Ceci certifie que",
        "de": "Dies bescheinigt, dass",
        "es": "Esto certifica que",
        "ar": "يشهد هذا بأن",
        "ja": "これは、"
      },
      "has successfully completed the course by demonstrating theoretical and practical understanding of": {
        "fr": "a suivi avec succès le cours en démontrant une compréhension théorique et pratique de",
        "de": "hat den Kurs erfolgreich abgeschlossen, indem er theoretisches und praktisches Verständnis nachgewiesen hat von",
        "es": "ha completado con éxito el curso demostrando una comprensión teórica y práctica de",
        "ar": "أكمل الدورة بنجاح من خلال إظهار الفهم النظري والعملي لـ",
        "ja": "の理論的および実践的な理解を示すことにより、コースを正常に完了しました"
      },
      "SQL": {
        "fr": "SQL",
        "de": "SQL",
        "es": "SQL",
        "ar": "SQL",
        "ja": "SQL"
      },
      "Chief Executive Officer": {
        "fr": "Directeur Général",
        "de": "Geschäftsführer",
        "es": "Director Ejecutivo",
        "ar": "الرئيس التنفيذي",
        "ja": "最高経営責任者"
      },
      "Introduction to C": {
        "fr": "Introduction au C",
        "de": "Einführung in C",
        "es": "Introducción a C",
        "ar": "مقدمة إلى C",
        "ja": "C言語入門"
      },
      "Web Development Fundamentals": {
        "fr": "Fondamentaux du Développement Web",
        "de": "Grundlagen der Webentwicklung",
        "es": "Fundamentos del Desarrollo Web",
        "ar": "أساسيات تطوير الويب",
        "ja": "ウェブ開発の基礎"
      },
      "CERTIFICATE OF ACHIEVEMENT": {
        "fr": "CERTIFICAT DE RÉUSSITE",
        "de": "ERFOLGSZERTIFIKAT",
        "es": "CERTIFICADO DE LOGRO",
        "ar": "شهادة إنجاز",
        "ja": "達成証明書"
      },
      "This is to certify that Badr Ribzat has successfully completed": {
        "fr": "Ceci certifie que Badr Ribzat a terminé avec succès",
        "de": "Dies bescheinigt, dass Badr Ribzat erfolgreich abgeschlossen hat",
        "es": "Esto certifica que Badr Ribzat ha completado con éxito",
        "ar": "يشهد هذا بأن بدر ربزات قد أكمل بنجاح",
        "ja": "バドル・リブザットが正常に完了したことを証明します"
      },
      "the Basics of Python guided path on Codestudio": {
        "fr": "le parcours guidé Bases de Python sur Codestudio",
        "de": "den geführten Pfad Grundlagen von Python auf Codestudio",
        "es": "la ruta guiada de Fundamentos de Python en Codestudio",
        "ar": "المسار الموجه لأساسيات بايثون على Codestudio",
        "ja": "CodeStudioのPythonの基本ガイド付きパス"
      },
      "Modules Covered - Introduction to Python, Variables and Data Types, Basic I/O in Python etc.": {
        "fr": "Modules couverts - Introduction au Python, Variables et Types de données, E/S de base en Python, etc.",
        "de": "Abgedeckte Module - Einführung in Python, Variablen und Datentypen, grundlegende E/A in Python usw.",
        "es": "Módulos cubiertos - Introducción a Python, Variables y Tipos de datos, E/S básica en Python, etc.",
        "ar": "الوحدات المغطاة - مقدمة إلى بايثون، المتغيرات وأنواع البيانات، الإدخال/الإخراج الأساسي في بايثون، إلخ.",
        "ja": "カバーされたモジュール - Pythonの紹介、変数とデータ型、Pythonの基本的なI/Oなど。"
      },
      "Python for Beginners": {
        "fr": "Python pour les débutants",
        "de": "Python für Anfänger",
        "es": "Python para principiantes",
        "ar": "بايثون للمبتدئين",
        "ja": "Python入門"
      },
      "In recognition of the commitment to achieve professional excellence": {
        "fr": "En reconnaissance de l'engagement à atteindre l'excellence professionnelle",
        "de": "In Anerkennung des Engagements, professionelle Exzellenz zu erreichen",
        "es": "En reconocimiento del compromiso de lograr la excelencia profesional",
        "ar": "تقديراً للالتزام بتحقيق التميز المهني",
        "ja": "プロフェッショナルな卓越性を達成するためのコミットメントを称えて"
      },
      "Has successfully satisfied the requirements for:": {
        "fr": "A satisfait avec succès les exigences pour :",
        "de": "Hat die Anforderungen erfolgreich erfüllt für:",
        "es": "Ha satisfecho con éxito los requisitos para:",
        "ar": "استوفى المتطلبات بنجاح لـ:",
        "ja": "の要件を正常に満たしました:"
      },
      "Artificial Intelligence Fundamentals": {
        "fr": "Fondamentaux de l'Intelligence Artificielle",
        "de": "Grundlagen der Künstlichen Intelligenz",
        "es": "Fundamentos de la Inteligencia Artificial",
        "ar": "أساسيات الذكاء الاصطناعي",
        "ja": "人工知能の基礎"
      },
      "CERTIFICATE": {
        "fr": "CERTIFICAT",
        "de": "ZERTIFIKAT",
        "es": "CERTIFICADO",
        "ar": "شهادة",
        "ja": "証明書"
      },
      "OF ACHIEVEMENT": {
        "fr": "DE RÉUSSITE",
        "de": "DES ERFOLGS",
        "es": "DE LOGRO",
        "ar": "إنجاز",
        "ja": "達成"
      },
      "Proudly Presented to": {
        "fr": "Fièrement présenté à",
        "de": "Stolz präsentiert an",
        "es": "Presentado con orgullo a",
        "ar": "مقدمة بكل فخر إلى",
        "ja": "に誇りを持って贈呈"
      },
      "Certified from M3aarf Platform For Studying a course about": {
        "fr": "Certifié par la plateforme M3aarf pour avoir étudié un cours sur",
        "de": "Zertifiziert von der M3aarf Plattform für das Studium eines Kurses über",
        "es": "Certificado de la Plataforma M3aarf por estudiar un curso sobre",
        "ar": "معتمد من منصة معارف لدراسة دورة حول",
        "ja": "M3aarfプラットフォームによって認定されたコースについて"
      },
      "CANCER": {
        "fr": "CANCER",
        "de": "KREBS",
        "es": "CÁNCER",
        "ar": "السرطان",
        "ja": "がん"
      },
      "شهادة اتمام مساق": {
        "en": "Course Completion Certificate",
        "fr": "Certificat de réussite du cours",
        "de": "Kursabschlusszertifikat",
        "es": "Certificado de finalización del curso",
        "ar": "شهادة إتمام مساق",
        "ja": "コース修了証明書"
      },
      "تم منح شهادة اتمام المساق هذه الى": {
        "en": "This course completion certificate was granted to",
        "fr": "Ce certificat de réussite de cours a été délivré à",
        "de": "Dieses Kursabschlusszertifikat wurde verliehen an",
        "es": "Este certificado de finalización del curso fue otorgado a",
        "ar": "تم منح شهادة إتمام المساق هذه إلى",
        "ja": "このコース修了証明書はに付与されました"
      },
      "لإتمام المساق التالي بنجاح": {
        "en": "for successfully completing the following course",
        "fr": "pour avoir réussi le cours suivant",
        "de": "für den erfolgreichen Abschluss des folgenden Kurses",
        "es": "por completar con éxito el siguiente curso",
        "ar": "لإتمام المساق التالي بنجاح",
        "ja": "次のコースを正常に完了したため"
      },
      "التغذية العلاجية": {
        "en": "Therapeutic Nutrition",
        "fr": "Nutrition Thérapeutique",
        "de": "Therapeutische Ernährung",
        "es": "Nutrición Terapéutica",
        "ar": "التغذية العلاجية",
        "ja": "治療栄養"
      },
      "Diploma": {
        "en": "Diploma",
        "fr": "Diplôme",
        "de": "Diplom",
        "es": "Diploma",
        "ar": "دبلوم",
        "ja": "ディプロマ"
      },
      "This is to certify that": {
        "fr": "Ceci certifie que",
        "de": "Dies bescheinigt, dass",
        "es": "Esto certifica que",
        "ar": "يشهد هذا بأن",
        "ja": "これは、"
      },
      "Successfully obtained": {
        "fr": "Obtenu avec succès",
        "de": "Erfolgreich erhalten",
        "es": "Obtenido con éxito",
        "ar": "تم الحصول عليها بنجاح",
        "ja": "正常に取得"
      },
      "Diploma in Pharmacy Technician": {
        "fr": "Diplôme de Technicien en Pharmacie",
        "de": "Diplom als Pharmatechniker",
        "es": "Diploma de Técnico de Farmacia",
        "ar": "دبلوم فني صيدلة",
        "ja": "薬局技術者のディプロマ"
      },
      "CERTIFICATE OF COMPLETION": {
        "fr": "CERTIFICAT D'ACHÈVEMENT",
        "de": "ABSCHLUSSZERTIFIKAT",
        "es": "CERTIFICADO DE FINALIZACIÓN",
        "ar": "شهادة إتمام",
        "ja": "修了証明書"
      },
      "Presented to": {
        "fr": "Présenté à",
        "de": "Präsentiert an",
        "es": "Presentado a",
        "ar": "مقدم إلى",
        "ja": "贈呈"
      },
      "For successfully completing a free online course": {
        "fr": "Pour avoir réussi un cours en ligne gratuit",
        "de": "Für den erfolgreichen Abschluss eines kostenlosen Online-Kurses",
        "es": "Por completar con éxito un curso online gratuito",
        "ar": "لإكمال دورة تدريبية مجانية عبر الإنترنت بنجاح",
        "ja": "無料のオンラインコースを正常に完了したため"
      },
      "Sales and BD Interview Preparation": {
        "fr": "Préparation à l'entretien de vente et de développement commercial",
        "de": "Vorbereitung auf Verkaufs- und BD-Interviews",
        "es": "Preparación para Entrevistas de Ventas y Desarrollo de Negocios",
        "ar": "إعداد لمقابلة المبيعات وتطوير الأعمال",
        "ja": "営業およびBD面接準備"
      },
      "Provided by": {
        "fr": "Fourni par",
        "de": "Bereitgestellt von",
        "es": "Proporcionado por",
        "ar": "مقدم من",
        "ja": "提供元"
      },
      "Great Learning Academy": {
        "fr": "Académie Great Learning",
        "de": "Great Learning Akademie",
        "es": "Academia Great Learning",
        "ar": "أكاديمية التعلم العظيم",
        "ja": "グレートラーニングアカデミー"
      },
      "فنون الطهي وإعداد الطعام": {
        "en": "Culinary Arts & Food Preparation",
        "fr": "Arts Culinaires & Préparation des Aliments",
        "de": "Kochkunst & Lebensmittelzubereitung",
        "es": "Artes Culinarias y Preparación de Alimentos",
        "ar": "فنون الطهي وإعداد الطعام",
        "ja": "料理芸術と食品準備"
      },
      "شهادة إكمال دورة من موقع": {
        "en": "Course completion certificate from website",
        "fr": "Certificat de fin de cours du site web",
        "de": "Kursabschlusszertifikat von der Website",
        "es": "Certificado de finalización de curso del sitio web",
        "ar": "شهادة إكمال دورة من موقع",
        "ja": "ウェブサイトからのコース修了証明書"
      },
      "يشهد موقع فرصة دوت كوم لفرص التعليم والتدريب وبناء القدرات أن": {
        "en": "Forasacenter.com for education, training and capacity building certifies that",
        "fr": "Forasacenter.com pour l'éducation, la formation et le renforcement des capacités certifie que",
        "de": "Forasacenter.com für Bildung, Ausbildung und Kapazitätsaufbau bescheinigt, dass",
        "es": "Forasacenter.com para educación, formación y desarrollo de capacidades certifica que",
        "ar": "يشهد موقع فرصة دوت كوم لفرص التعليم والتدريب وبناء القدرات أن",
        "ja": "教育、訓練、能力開発のためのForasacenter.comが認定します"
      },
      "قد استكملت بنجاح متطلبات دورة عبر الإنترنت بعنوان": {
        "en": "has successfully completed the requirements for an online course titled",
        "fr": "a réussi les exigences d'un cours en ligne intitulé",
        "de": "hat die Anforderungen für einen Online-Kurs mit dem Titel erfolgreich abgeschlossen",
        "es": "ha completado con éxito los requisitos para un curso en línea titulado",
        "ar": "قد استكملت بنجاح متطلبات دورة عبر الإنترنت بعنوان",
        "ja": "というオンラインコースの要件を正常に完了しました"
      },
      "تحدث الإنجليزية الاحترافية": {
        "en": "Professional English Speaking",
        "fr": "Anglais Professionnel Oral",
        "de": "Professionelles Englisch Sprechen",
        "es": "Habla Inglesa Profesional",
        "ar": "تحدث الإنجليزية الاحترافية",
        "ja": "プロフェッショナルな英語のスピーキング"
      },
      "التسويق الإلكتروني": {
        "en": "E-Marketing",
        "fr": "E-Marketing",
        "de": "E-Marketing",
        "es": "E-Marketing",
        "ar": "التسويق الإلكتروني",
        "ja": "e-マーケティング"
      },
      "Certificate of completion": {
        "fr": "Certificat d'achèvement",
        "de": "Abschlusszertifikat",
        "es": "Certificado de finalización",
        "ar": "شهادة إتمام",
        "ja": "修了証明書"
      },
      "has successfully completed the online course": {
        "fr": "a réussi le cours en ligne",
        "de": "hat den Online-Kurs erfolgreich abgeschlossen",
        "es": "ha completado con éxito el curso en línea",
        "ar": "أكمل الدورة التدريبية عبر الإنترنت بنجاح",
        "ja": "オンラインコースを正常に完了しました"
      },
      "English Beginner": {
        "fr": "Anglais Débutant",
        "de": "Englisch für Anfänger",
        "es": "Inglés para principiantes",
        "ar": "الإنجليزية للمبتدئين",
        "ja": "英語初心者"
      },
      "Congratulations, We wish you more success in your life": {
        "fr": "Félicitations, nous vous souhaitons plus de succès dans votre vie",
        "de": "Herzlichen Glückwunsch, wir wünschen Ihnen viel Erfolg in Ihrem Leben",
        "es": "Felicidades, le deseamos más éxito en su vida",
        "ar": "تهانينا، نتمنى لك المزيد من النجاح في حياتك",
        "ja": "おめでとうございます、あなたの人生のさらなる成功を願っています"
      },
      "شهادة مدرسية": {
        "en": "School Certificate",
        "fr": "Certificat Scolaire",
        "de": "Schulzeugnis",
        "es": "Certificado Escolar",
        "ar": "شهادة مدرسية",
        "ja": "学校証明書"
      },
      "يشهد الموقع أسفله السيد : خالد مكوار": {
        "en": "The undersigned, Mr. Khalid Makwar, certifies that:",
        "fr": "Le soussigné, M. Khalid Makwar, certifie que :",
        "de": "Der Unterzeichnete, Herr Khalid Makwar, bestätigt hiermit:",
        "es": "El abajo firmante, Sr. Khalid Makwar, certifica que:",
        "ar": "يشهد الموقع أسفله السيد : خالد مكوار",
        "ja": "署名者のハリド・マクワル氏が証明する"
      },
      "بصفته : مديرا بالمؤسسة": {
        "en": "In his capacity as: Director of the institution",
        "fr": "En sa qualité de : Directeur de l'établissement",
        "de": "In seiner Eigenschaft als: Direktor der Institution",
        "es": "En su calidad de: Director de la institución",
        "ar": "بصفته : مديرا بالمؤسسة",
        "ja": "機関のディレクターとして"
      },
      "أن التلميذ : بدر ربزات": {
        "en": "That the student: Badr Ribzat",
        "fr": "Que l'élève : Badr Ribzat",
        "de": "Dass der Schüler: Badr Ribzat",
        "es": "Que el alumno: Badr Ribzat",
        "ar": "أن التلميذ : بدر ربزات",
        "ja": "生徒：バドル・リブザット"
      },
      "المولود في : سيدي يحى الغرب": {
        "en": "Born in: Sidi Yahya El Gharb",
        "fr": "Né à : Sidi Yahya El Gharb",
        "de": "Geboren in: Sidi Yahya El Gharb",
        "es": "Nacido en: Sidi Yahya El Gharb",
        "ar": "المولود في : سيدي يحى الغرب",
        "ja": "出身地：シディ・ヤヒヤ・エル・ガルブ"
      },
      "والمسجل تحت رقم :": {
        "en": "And registered under number:",
        "fr": "Et enregistré sous le numéro :",
        "de": "Und registriert unter Nummer:",
        "es": "Y registrado bajo el número:",
        "ar": "والمسجل تحت رقم :",
        "ja": "登録番号："
      },
      "يتابع دراسة بقسم :": {
        "en": "Is studying in the section:",
        "fr": "Suit les études dans la section :",
        "de": "Studiert in der Sektion:",
        "es": "Está estudiando en la sección:",
        "ar": "يتابع دراسة بقسم :",
        "ja": "セクションで勉強中："
      },
      "كان يتابع دراسته بالمستوى :": {
        "en": "Was pursuing his studies at the level:",
        "fr": "Poursuivait ses études au niveau :",
        "de": "Verfolgte sein Studium auf dem Niveau:",
        "es": "Estaba cursando sus estudios en el nivel:",
        "ar": "كان يتابع دراسته بالمستوى :",
        "ja": "レベルで勉強中だった："
      },
      "وقد غادرة المؤسسة بتاريخ :": {
        "en": "And left the institution on:",
        "fr": "Et a quitté l'établissement le :",
        "de": "Und verließ die Institution am:",
        "es": "Y dejó la institución el:",
        "ar": "وقد غادرة المؤسسة بتاريخ :",
        "ja": "そして、その機関を去ったのは："
      },
      "ملاحظات : سلمت هذه الشهادة لغرض إداري": {
        "en": "Notes: This certificate was issued for administrative purposes.",
        "fr": "Notes : Ce certificat a été délivré à des fins administratives.",
        "de": "Hinweise: Diese Bescheinigung wurde zu administrativen Zwecken ausgestellt.",
        "es": "Notas: Este certificado fue emitido con fines administrativos.",
        "ar": "ملاحظات : سلمت هذه الشهادة لغرض إداري",
        "ja": "備考：この証明書は事務処理のために発行されました。"
      }
    };
    
    // Check if we have a translation for this exact text
    if (translations[text] && translations[text][targetLang]) {
      return translations[text][targetLang];
    }
    
    // Try to find partial matches for longer text (especially for Arabic which can have prefixes/suffixes)
    if (text.length > 10) { // Only attempt for longer strings to avoid over-matching common words
      for (const [key, value] of Object.entries(translations)) {
        if (text.includes(key) && value[targetLang]) {
          // A more sophisticated partial replacement logic might be needed here
          // For now, if a key is found as a substring, replace it.
          // This might not be perfect for all cases but is a step up from exact match only.
          return text.replace(key, value[targetLang]);
        }
      }
    }
    
    // Return null if no translation found
    return null;
  }, [originalLanguage]);

  // Handle document load
  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    onDocumentLoadSuccess(numPages);
    // Ensure pdfjs.getDocument is called once and memoized
    if (!pdfDocumentInstance) {
      setPdfDocumentInstance(pdfjs.getDocument(pdfUrl).promise);
    }
  };

  // Load text when page or translation mode changes
  useEffect(() => {
    async function loadAndTranslateTextItems() {
      if (pdfDocumentInstance) {
        setTranslationInProgress(true); // Indicate translation is starting
        const items = await extractTextFromPage(await pdfDocumentInstance, pageNumber);
        setTextItems(items);
        setTranslationInProgress(false); // Indicate translation is finished
      }
    }
    
    if (isTranslateMode) {
      loadAndTranslateTextItems();
    } else {
      setTextItems([]); // Clear text items when translation mode is off
    }
  }, [pdfDocumentInstance, pageNumber, scale, isTranslateMode, extractTextFromPage, setTranslationInProgress]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
        {/* Page Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1 || isLoading}
            className={`p-2 rounded-full ${
              pageNumber <= 1 || isLoading
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t('page')} {pageNumber} {t('of')} {numPages || '-'}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1) || isLoading}
            className={`p-2 rounded-full ${
              pageNumber >= (numPages || 1) || isLoading
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 mr-2">
            <button
              onClick={() => handleZoom(-0.2)}
              disabled={scale <= 0.5}
              className={`p-2 rounded-full ${
                scale <= 0.5
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.2)}
              disabled={scale >= 3.0}
              className={`p-2 rounded-full ${
                scale >= 3.0
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          
          {/* Translation Toggle */}
          <motion.button
            onClick={handleTranslationToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading || translationInProgress}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              isLoading || translationInProgress
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : isTranslateMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>
              {translationInProgress 
                ? t('translating') 
                : isTranslateMode 
                  ? t('hideTranslation') 
                  : t('showTranslation')}
            </span>
          </motion.button>
          
          {/* Overlay Toggle (only visible in translation mode) */}
          {isTranslateMode && (
            <motion.button
              onClick={() => setShowOverlay(!showOverlay)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                showOverlay
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{showOverlay ? t('hideOverlay') : t('showOverlay')}</span>
            </motion.button>
          )}
          
          {/* Download Button */}
          <a
            href={pdfUrl}
            download
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>{t('download')}</span>
          </a>
        </div>
      </div>
      
      {/* Translation Processing Notice */}
      <AnimatePresence>
        {translationInProgress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-800 p-2 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">{t('processingTranslation')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer */}
      <div className="relative bg-gray-100 dark:bg-gray-900 flex justify-center p-4 overflow-auto min-h-[600px]">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10"
            >
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loading')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Document */}
        <div className="relative" style={{ transformOrigin: 'top center' }}>
          {/* This is where the dynamic PDFViewer component will render */}
          <PDFViewer 
            pdfUrl={pdfUrl}
            pageNumber={pageNumber}
            scale={scale}
            isTranslateMode={isTranslateMode}
            showOverlay={showOverlay}
            isLoading={isLoading}
            targetLanguage={i18n.language}
            originalLanguage={originalLanguage}
            onDocumentLoadSuccess={handleDocumentLoadSuccess}
            onPageLoadSuccess={handlePageLoadSuccess}
            setTranslationInProgress={setTranslationInProgress} // Pass setter here
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
