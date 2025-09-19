// pages/documents/[id].tsx
import React, { useState, useEffect } from 'react'; // Combined imports
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';
import { FileText, ArrowLeft, Globe, Info, Loader } from 'lucide-react'; // Added Loader import
import Link from 'next/link';

// Dynamically import DocumentViewer with no SSR
const DocumentViewer = dynamic(() => import('../../components/DocumentViewer'), { ssr: false });

// Document data structure
interface DocumentData {
  id: string;
  title: {
    en: string;
    fr: string;
    de: string;
    es: string;
    ar: string;
    ja: string;
  };
  description: {
    en: string;
    fr: string;
    de: string;
    es: string;
    ar: string;
    ja: string;
  };
  category: string;
  pdfUrl: string;
  originalLanguage: string;
  dateIssued: string;
  issuer: {
    en: string;
    fr: string;
    de: string;
    es: string;
    ar: string;
    ja: string;
  };
}

// Our documents database with UPDATED PDF PATHS
const documentsData: DocumentData[] = [
  {
    id: "alx-transcript",
    title: {
      en: "ALX Software Engineering Transcript",
      fr: "Relevé de notes d'ingénierie logicielle ALX",
      de: "ALX Software Engineering Transcript",
      es: "Transcripción de Ingeniería de Software ALX",
      ar: "سجل درجات هندسة البرمجيات ALX",
      ja: "ALX ソフトウェアエンジニアリング成績証明書",
    },
    description: {
      en: "Official transcript showing completion of the ALX Software Engineering program with a score of 106.76%",
      fr: "Relevé de notes officiel montrant l'achèvement du programme d'ingénierie logicielle ALX avec un score de 106.76%",
      de: "Offizielles Transcript, das den Abschluss des ALX Software Engineering-Programms mit einer Punktzahl von 106.76% zeigt",
      es: "Transcripción oficial que muestra la finalización del programa de Ingeniería de Software ALX con una puntuación de 106.76%",
      ar: "سجل درجات رسمي يوضح إتمام برنامج هندسة البرمجيات ALX بدرجة 106.76٪",
      ja: "ALX ソフトウェアエンジニアリングプログラムを106.76%のスコアで修了したことを示す公式成績証明書",
    },
    category: "education",
    pdfUrl: "/documents/education/alx-transcript.pdf",
    originalLanguage: "en",
    dateIssued: "2023-12",
    issuer: {
      en: "ALX Africa (Holberton School)",
      fr: "ALX Afrique (École Holberton)",
      de: "ALX Afrika (Holberton Schule)",
      es: "ALX África (Escuela Holberton)",
      ar: "ALX أفريقيا (مدرسة هولبرتون)",
      ja: "ALX アフリカ（ホルバートン・スクール）",
    }
  },
  {
    id: "driver-license",
    title: {
      en: "Professional Driver License",
      fr: "Permis de Conduire Professionnel",
      de: "Professioneller Führerschein",
      es: "Licencia de Conducir Profesional",
      ar: "رخصة قيادة مهنية",
      ja: "プロドライバーライセンス",
    },
    description: {
      en: "Moroccan driver license certification for category B vehicles",
      fr: "Certification marocaine du permis de conduire pour les véhicules de catégorie B",
      de: "Marokkanische Führerscheinzertifizierung für Fahrzeuge der Kategorie B",
      es: "Certificación de licencia de conducir marroquí para vehículos de categoría B",
      ar: "شهادة رخصة القيادة المغربية للمركبات من الفئة B",
      ja: "カテゴリBの車両のためのモロッコの運転免許証明書",
    },
    category: "professional",
    pdfUrl: "/documents/professional/driver-license.pdf",
    originalLanguage: "ar",
    dateIssued: "2011-05",
    issuer: {
      en: "Kingdom of Morocco Ministry of Transportation",
      fr: "Royaume du Maroc Ministère du Transport",
      de: "Königreich Marokko Ministerium für Verkehr",
      es: "Reino de Marruecos Ministerio de Transporte",
      ar: "وزارة النقل بالمملكة المغربية",
      ja: "モロッコ王国運輸省",
    }
  },
  {
    id: "hairstyling-diploma",
    title: {
      en: "Professional Hairstyling Diploma",
      fr: "Diplôme de Coiffure Professionnelle",
      de: "Diplom für professionelles Haarstyling",
      es: "Diploma de Peluquería Profesional",
      ar: "دبلوم تصفيف الشعر المهني",
      ja: "プロフェッショナルヘアスタイリング卒業証書",
    },
    description: {
      en: "State-recognized certification in men's and women's hairstyling techniques",
      fr: "Certification reconnue par l'État en techniques de coiffure pour hommes et femmes",
      de: "Staatlich anerkannte Zertifizierung in Haarstyling-Techniken für Männer und Frauen",
      es: "Certificación reconocida por el estado en técnicas de peluquería para hombres y mujeres",
      ar: "شهادة معترف بها من الدولة في تقنيات تصفيف الشعر للرجال والنساء",
      ja: "男性と女性のヘアスタイリング技術に関する国家認定資格",
    },
    category: "professional",
    pdfUrl: "/documents/professional/hairstyling-diploma.pdf",
    originalLanguage: "ar",
    dateIssued: "2014-10",
    issuer: {
      en: "Ecole Univers Coiffure (State-Recognized)",
      fr: "Ecole Univers Coiffure (Reconnue par l'État)",
      de: "Ecole Univers Coiffure (Staatlich anerkannt)",
      es: "Ecole Univers Coiffure (Reconocida por el Estado)",
      ar: "مدرسة يونيفيرس كوافور (معترف بها من الدولة)",
      ja: "エコール・ユニヴェルス・クワフュール（国家認定）",
    }
  },
  {
    id: "ibm-design",
    title: {
      en: "IBM Design Thinking Practitioner Certificate",
      fr: "Certificat de Praticien en Design Thinking IBM",
      de: "IBM Design Thinking Praktiker Zertifikat",
      es: "Certificado de Practicante de Design Thinking de IBM",
      ar: "شهادة ممارس التفكير التصميمي من آي بي إم",
      ja: "IBM デザイン思考実践者認定証",
    },
    description: {
      en: "Certification in IBM's approach to human-centered design and problem-solving",
      fr: "Certification dans l'approche d'IBM en matière de design centré sur l'humain et de résolution de problèmes",
      de: "Zertifizierung im Ansatz von IBM für menschzentriertes Design und Problemlösung",
      es: "Certificación en el enfoque de IBM para el diseño centrado en el humano y la resolución de problemas",
      ar: "شهادة في نهج آي بي إم للتصميم المتمحور حول الإنسان وحل المشكلات",
      ja: "人間中心設計と問題解決に対するIBMのアプローチにおける認定",
    },
    category: "technical",
    pdfUrl: "/documents/technical/ibm-design-certificate.pdf",
    originalLanguage: "en",
    dateIssued: "2025-09",
    issuer: {
      en: "IBM",
      fr: "IBM",
      de: "IBM",
      es: "IBM",
      ar: "آي بي إم",
      ja: "IBM",
    },
    thumbnail: "/images/portfolio-project.jpg"
  },
  {
    id: "software-engineering-certificates",
    title: {
      en: "Software Engineering Certifications",
      fr: "Certifications en Ingénierie Logicielle",
      de: "Zertifizierungen in der Softwareentwicklung",
      es: "Certificaciones de Ingeniería de Software",
      ar: "شهادات هندسة البرمجيات",
      ja: "ソフトウェアエンジニアリング認定証",
    },
    description: {
      en: "Collection of certificates earned through self-study in various aspects of software engineering",
      fr: "Collection de certificats obtenus par auto-apprentissage dans divers aspects de l'ingénierie logicielle",
      de: "Sammlung von Zertifikaten, die durch Selbststudium in verschiedenen Aspekten der Softwareentwicklung erworben wurden",
      es: "Colección de certificados obtenidos mediante autoestudio en varios aspectos de la ingeniería de software",
      ar: "مجموعة من الشهادات التي حصلت عليها من خلال التعلم الذاتي في جوانب مختلفة من هندسة البرمجيات",
      ja: "ソフトウェアエンジニアリングのさまざまな側面における独学で獲得した証明書のコレクション",
    },
    category: "technical",
    pdfUrl: "/documents/technical/software-engineering-certificates.pdf",
    originalLanguage: "en",
    dateIssued: "2022-2023",
    issuer: {
      en: "Various Online Platforms",
      fr: "Diverses Plateformes En Ligne",
      de: "Verschiedene Online-Plattformen",
      es: "Varias Plataformas En Línea",
      ar: "منصات متنوعة عبر الإنترنت",
      ja: "さまざまなオンラインプラットフォーム",
    },
    thumbnail: "/images/chatbot-project.jpg"
  },
  {
    id: "nutrition-certificates",
    title: {
      en: "Nutrition & Health Certificates",
      fr: "Certificats en Nutrition et Santé",
      de: "Zertifikate in Ernährung und Gesundheit",
      es: "Certificados de Nutrición y Salud",
      ar: "شهادات التغذية والصحة",
      ja: "栄養と健康の証明書",
    },
    description: {
      en: "Self-study certifications in therapeutic nutrition, health management and food science",
      fr: "Certifications en auto-apprentissage en nutrition thérapeutique, gestion de la santé et science des aliments",
      de: "Selbststudium-Zertifizierungen in therapeutischer Ernährung, Gesundheitsmanagement und Lebensmittelwissenschaft",
      es: "Certificaciones de autoestudio en nutrición terapéutica, gestión de la salud y ciencia de los alimentos",
      ar: "شهادات الدراسة الذاتية في التغذية العلاجية وإدارة الصحة وعلوم الأغذية",
      ja: "治療栄養、健康管理、食品科学における自己学習認定",
    },
    category: "health",
    pdfUrl: "/documents/health/nutrition-certificates.pdf",
    originalLanguage: "ar",
    dateIssued: "2020-12",
    issuer: {
      en: "Edraak & Other Platforms",
      fr: "Edraak et Autres Plateformes",
      de: "Edraak und Andere Plattformen",
      es: "Edraak y Otras Plataformas",
      ar: "إدراك ومنصات أخرى",
      ja: "エドラアクおよびその他のプラットフォーム",
    }
  },
  {
    id: "english-certificates",
    title: {
      en: "English Language Certifications",
      fr: "Certifications en Langue Anglaise",
      de: "Englisch-Sprachzertifikate",
      es: "Certificaciones del Idioma Inglés",
      ar: "شهادات اللغة الإنجليزية",
      ja: "英語能力認定証",
    },
    description: {
      en: "Various certificates showing English language proficiency at upper-intermediate (B2) level",
      fr: "Divers certificats attestant de la maîtrise de l'anglais au niveau intermédiaire supérieur (B2)",
      de: "Verschiedene Zertifikate, die Englischkenntnisse auf höherem Mittelstufe-Niveau (B2) nachweisen",
      es: "Varios certificados que muestran dominio del inglés a nivel intermedio superior (B2)",
      ar: "شهادات متنوعة تظهر إتقان اللغة الإنجليزية بمستوى متوسط عالي (B2)",
      ja: "中上級（B2）レベルの英語能力を示すさまざまな証明書",
    },
    category: "language",
    pdfUrl: "/documents/language/english-certificates.pdf",
    originalLanguage: "en",
    dateIssued: "2023-01",
    issuer: {
      en: "Saylor Academy & Others",
      fr: "Saylor Academy et Autres",
      de: "Saylor Academy und Andere",
      es: "Saylor Academy y Otros",
      ar: "أكاديمية سايلور وغيرها",
      ja: "セイラーアカデミーおよびその他",
    }
  },
  {
    id: "third-level-certificate",
    title: {
      en: "Third Level Preparatory Certificate",
      fr: "Certificat de Troisième Niveau Préparatoire",
      de: "Zertifikat der Dritten Vorbereitungsstufe",
      es: "Certificado de Tercer Nivel Preparatorio",
      ar: "شهادة المستوى الثالث الإعدادي",
      ja: "第三段階準備証明書",
    },
    description: {
      en: "Official educational certificate showing completion of third level preparatory education in Morocco",
      fr: "Certificat officiel d'éducation attestant l'achèvement du troisième niveau préparatoire au Maroc",
      de: "Offizielles Bildungszertifikat, das den Abschluss der dritten Vorbereitungsstufe in Marokko nachweist",
      es: "Certificado educativo oficial que muestra la finalización del tercer nivel preparatorio en Marruecos",
      ar: "شهادة تعليمية رسمية تظهر إتمام المستوى الثالث الإعدادي في المغرب",
      ja: "モロッコでの第三段階の準備教育修了を示す公式教育証明書",
    },
    category: "education",
    pdfUrl: "/documents/education/third-level-certificate.pdf",
    originalLanguage: "ar",
    dateIssued: "2008",
    issuer: {
      en: "Ministry of Education, Morocco",
      fr: "Ministère de l'Éducation, Maroc",
      de: "Bildungsministerium, Marokko",
      es: "Ministerio de Educación, Marruecos",
      ar: "وزارة التربية الوطنية، المغرب",
      ja: "モロッコ教育省",
    },
  }
];

const DocumentPage: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation('documents');
  const { id } = router.query;

  // Find the current document
  const document = documentsData.find(doc => doc.id === id);

  // Conditionally render DocumentViewer based on its dynamic import status
  const [isDocumentViewerLoaded, setIsDocumentViewerLoaded] = useState(true);

  useEffect(() => {
    // Only set to true if DocumentViewer has been dynamically loaded
    if (DocumentViewer.displayName === 'DynamicDocumentViewer') {
      setIsDocumentViewerLoaded(true);
    }
  }, []);

  if (!document) {
    return (
      <Layout title={t('notFound.title')} description={t('notFound.description')}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <FileText className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {t('notFound.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('notFound.description')}
            </p>
            <Link href="/documents">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                {t('notFound.button')}
              </motion.button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Get localized document data
  const currentLocale = i18n.language as keyof typeof document.title;
  const localizedTitle = document.title[currentLocale] || document.title.en;
  const localizedDescription = document.description[currentLocale] || document.description.en;
  const localizedIssuer = document.issuer[currentLocale] || document.issuer.en;

  return (
    <Layout
      title={`${localizedTitle} | ${t('documentViewer')}`}
      description={localizedDescription}
    >
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/documents">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('backToDocuments')}</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Document Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {localizedTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                {t(`categories.${document.category}`)}
              </span>
              <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Globe className="w-4 h-4" />
                <span>
                  {t('originalLanguage')}: {t(`languages.${document.originalLanguage}`)}
                </span>
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {t('issuedOn')}: {document.dateIssued}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {t('issuedBy')}: {localizedIssuer}
              </span>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {localizedDescription}
            </p>
          </motion.div>

          {/* Translation Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">
                <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                  {t('translationNotice.title')}
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  {t('translationNotice.description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Document Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isDocumentViewerLoaded ? (
              <DocumentViewer 
                pdfUrl={document.pdfUrl}
                title={localizedTitle}
                description={localizedDescription}
                originalLanguage={document.originalLanguage}
              />
            ) : (
              <div className="flex items-center justify-center h-[600px] bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="ml-4 text-gray-600 dark:text-gray-400">Loading Document Viewer...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'fr', 'ar', 'de', 'es', 'ja'];
  const paths = documentsData.flatMap(doc => 
    locales.map(locale => ({
      params: { id: doc.id },
      locale: locale
    }))
  );
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'documents'])),
    },
  };
};

export default DocumentPage;
