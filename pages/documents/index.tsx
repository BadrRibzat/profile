// pages/documents/index.tsx
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Code
} from 'lucide-react';

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
  thumbnail?: string;
}

// Our documents database (same as in [id].tsx)
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
    pdfUrl: "/documents/education/alx-transcript.pdf", // Updated path
    originalLanguage: "en",
    dateIssued: "2023-12",
    issuer: {
      en: "ALX Africa (Holberton School)",
      fr: "ALX Afrique (École Holberton)",
      de: "ALX Afrika (Holberton Schule)",
      es: "ALX África (Escuela Holberton)",
      ar: "ALX أفريقيا (مدرسة هولبرتون)",
      ja: "ALX アフリカ（ホルバートン・スクール）",
    },
    thumbnail: "/images/education-project.jpg"
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
    pdfUrl: "/documents/professional/driver-license.pdf", // Updated path
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
    pdfUrl: "/documents/professional/hairstyling-diploma.pdf", // Updated path
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
    pdfUrl: "/documents/technical/ibm-design-certificate.pdf", // Updated path
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
    pdfUrl: "/documents/technical/software-engineering-certificates.pdf", // Updated path
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
    pdfUrl: "/documents/health/nutrition-certificates.pdf", // Updated path
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
    pdfUrl: "/documents/language/english-certificates.pdf", // Updated path
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
    pdfUrl: "/documents/education/third-level-certificate.pdf", // Updated path
    originalLanguage: "ar",
    dateIssued: "2008",
    issuer: {
      en: "Ministry of Education, Morocco",
      fr: "Ministère de l'Éducation, Maroc",
      de: "Bildungsministerium, Marokko",
      es: "Ministerio de Educación, Marruecos",
      ar: "وزارة التربية الوطنية، المغرب",
      ja: "モロッコ教育省",
    }
  }
];

const DocumentsPage: React.FC = () => {
  const { t, i18n } = useTranslation(['documents', 'common']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get the current locale
  const currentLocale = i18n.language as keyof typeof documentsData[0]['title'];
  
  // Filter documents based on search query and category
  const filteredDocuments = documentsData.filter(doc => {
    const titleMatch = doc.title[currentLocale].toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = doc.description[currentLocale].toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return (titleMatch || descMatch) && categoryMatch;
  });
  
  // Category counts
  const categoryCounts = {
    all: documentsData.length,
    education: documentsData.filter(doc => doc.category === 'education').length,
    professional: documentsData.filter(doc => doc.category === 'professional').length,
    technical: documentsData.filter(doc => doc.category === 'technical').length,
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'professional': return <Briefcase className="w-5 h-5" />;
      case 'technical': return <Code className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <Layout
      title={t('documents:pageTitle')}
      description={t('documents:pageDescription')}
    >
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('documents:pageTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('documents:pageDescription')}
            </p>
          </motion.div>
          
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('documents:searchPlaceholder')}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div className="flex space-x-2">
                    {['all', 'education', 'professional', 'technical'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {t(`documents:categories.${category}`)} ({categoryCounts[category as keyof typeof categoryCounts]})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Document Grid */}
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {doc.thumbnail ? (
                      <img 
                        src={doc.thumbnail} 
                        alt={doc.title[currentLocale]} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.category === 'education' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : doc.category === 'professional'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {getCategoryIcon(doc.category)}
                        <span className="ml-1">{t(`documents:categories.${doc.category}`)}</span>
                      </span>
                    </div>
                    
                    <div className="absolute top-2 right-2">
                      <a
                        href={doc.pdfUrl}
                        download
                        className="inline-flex items-center p-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
                        title={t('documents:downloadDirectly')}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <Link href={`/documents/${doc.id}`}>
                    <div className="p-5 cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {doc.title[currentLocale]}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {doc.description[currentLocale]}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {t('documents:issuedOn')}: {doc.dateIssued}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                          {t('documents:viewWithTranslation')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <FileText className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {t('documents:noResultsFound')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('documents:tryDifferentSearch')}
              </p>
            </motion.div>
          )}
          
          {/* Pack Download */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {t('documents:downloadPack.title')}
              </h3>
              <p className="text-lg mb-6 opacity-90">
                {t('documents:downloadPack.description')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {['en', 'fr', 'de', 'es', 'ar', 'ja'].map((loc) => (
                  <a
                    key={loc}
                    href={`/proof/proof-pack-${loc}.pdf`}
                    download
                    className="flex items-center justify-center space-x-2 py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t(`common:languages.${loc}`)}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'documents'])),
    },
  };
};

export default DocumentsPage;
