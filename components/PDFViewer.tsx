// components/PDFViewer.tsx
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'next-i18next';
import { Loader } from 'lucide-react';

// Fix the worker setup - use unpkg CDN which is more reliable
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
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
  onDocumentLoadSuccess: (pageCount: number) => void;
  onPageLoadSuccess: () => void;
  isLoading?: boolean;
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
  isLoading = false,
}) => {
  const { t } = useTranslation('documents');
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Basic translation function - simplified for now
  const getTranslationOverlay = () => {
    if (!isTranslateMode || !showOverlay) return null;
    
    // For now, show a simple translation indicator
    return (
      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm z-10">
        Translation Mode: {originalLanguage} → {targetLanguage}
      </div>
    );
  };

  // Simplified translation function
  const translateText = useCallback((text: string, targetLang: string, sourceLang: string): string | null => {
    if (targetLang === sourceLang || !text || text.trim() === '') {
      return null;
    }
    
    // Basic translation dictionary
    const translations: Record<string, Record<string, string>> = {
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
      "Certificate": {
        "fr": "Certificat",
        "de": "Zertifikat",
        "es": "Certificado",
        "ar": "شهادة",
        "ja": "証明書"
      },
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
    
    return translations[text]?.[targetLang] || null;
  }, []);

  // Extract text from PDF page
  const extractTextFromPage = useCallback(async (pdf: any, pageNum: number) => {
    try {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale });
      
      setPageWidth(viewport.width);
      setPageHeight(viewport.height);

      const items: TextItem[] = textContent.items.map((item: any) => ({
        text: item.str,
        translatedText: translateText(item.str, targetLanguage, originalLanguage),
        x: item.transform[4],
        y: viewport.height - item.transform[5],
        width: item.width || 100,
        height: item.height || 20,
      }));

      return items;
    } catch (error) {
      console.error('Error extracting text:', error);
      return [];
    }
  }, [scale, targetLanguage, originalLanguage, translateText]);

  // Load text items when translation mode changes
  useEffect(() => {
    async function loadTextItems() {
      if (isTranslateMode && typeof window !== 'undefined') {
        try {
          const pdf = await pdfjs.getDocument(pdfUrl).promise;
          const items = await extractTextFromPage(pdf, pageNumber);
          setTextItems(items);
        } catch (error) {
          console.error('Error loading text items:', error);
          setTextItems([]);
        }
      } else {
        setTextItems([]);
      }
    }
    
    loadTextItems();
  }, [isTranslateMode, pageNumber, pdfUrl, extractTextFromPage]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setError(null);
    onDocumentLoadSuccess(numPages);
  };

  const handlePageLoadSuccess = () => {
    setError(null);
    onPageLoadSuccess();
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF document');
  };

  const handlePageLoadError = (error: Error) => {
    console.error('Page load error:', error);
    setError('Failed to load PDF page');
  };

  if (typeof window === 'undefined') {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-800 rounded-xl">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl">
        <div className="text-center">
          <p className="text-lg mb-2">Error Loading PDF</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {getTranslationOverlay()}
      <Document
        file={pdfUrl}
        onLoadSuccess={handleDocumentLoadSuccess}
        onLoadError={handleDocumentLoadError}
        loading={
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-center">
              <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading PDF...</p>
            </div>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-[600px] text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p>Error loading PDF document</p>
          </div>
        }
        options={{
          cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
        }}
      >
        <div className="relative">
          <Page
            pageNumber={pageNumber}
            scale={scale}
            onLoadSuccess={handlePageLoadSuccess}
            onLoadError={handlePageLoadError}
            loading={
              <div className="flex items-center justify-center h-[400px]">
                <Loader className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
            }
            error={
              <div className="flex items-center justify-center h-[400px] text-red-600">
                <p>Error loading page</p>
              </div>
            }
          />
          
          {/* Translation overlay */}
          {isTranslateMode && showOverlay && textItems.length > 0 && (
            <div 
              className="absolute top-0 left-0 pointer-events-none z-10"
              style={{
                width: pageWidth * scale,
                height: pageHeight * scale,
              }}
            >
              {textItems.map((item, index) => (
                item.translatedText && (
                  <div
                    key={index}
                    className="absolute text-xs bg-blue-600 text-white px-1 py-0.5 rounded shadow-lg opacity-90"
                    style={{
                      left: item.x * scale,
                      top: item.y * scale,
                      maxWidth: item.width * scale,
                      fontSize: `${8 * scale}px`,
                      lineHeight: '1.2',
                    }}
                  >
                    {item.translatedText}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
