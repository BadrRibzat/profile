// pages/contact.tsx
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Github,
  Linkedin,
  Globe,
  Calendar,
  Clock
} from 'lucide-react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';

const ContactPage: React.FC = () => {
  const { t } = useTranslation(['contact', 'common']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    preferredLanguage: 'en',
    opportunityType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    // Simple form submission to FormSubmit
    const response = await fetch('https://formsubmit.co/ajax/badrribzat@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          opportunityType: formData.opportunityType,
          preferredLanguage: formData.preferredLanguage,
          _replyto: formData.email, // Auto-reply to visitor
          _template: 'table', // Nice email template
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          preferredLanguage: 'en',
          opportunityType: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('contact:info.email', 'Email'),
      value: 'badrribzat@gmail.com',
      href: 'mailto:badrribzat@gmail.com'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('contact:info.phone', 'Phone'),
      value: '+212 627-764176',
      href: 'tel:+212627764176'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('contact:info.location', 'Location'),
      value: 'Ksar El Kebir, Morocco',
      href: '#'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: t('contact:info.timezone', 'Timezone'),
      value: 'GMT+1 (Morocco Time)',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: t('contact:social.github', 'GitHub'),
      href: 'https://github.com/BadrRibzat',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: t('contact:social.linkedin', 'LinkedIn'),
      href: 'https://linkedin.com/in/badr-ribzat',
      color: 'hover:text-blue-600'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: t('contact:social.portfolio', 'Portfolio'),
      href: 'https://badrribzat.dev',
      color: 'hover:text-purple-600'
    }
  ];

  const opportunityTypes = [
    { value: 'fulltime', label: t('contact:form.opportunities.fulltime', 'Full-Time Position') },
    { value: 'internship', label: t('contact:form.opportunities.internship', 'Internship') },
    { value: 'contract', label: t('contact:form.opportunities.contract', 'Contract Work') },
    { value: 'training', label: t('contact:form.opportunities.training', 'Training Opportunity') },
    { value: 'collaboration', label: t('contact:form.opportunities.collaboration', 'Collaboration') },
    { value: 'other', label: t('contact:form.opportunities.other', 'Other') }
  ];

  const languages = [
    { value: 'en', label: '🇺🇸 English', name: t('common:languages.en', 'English') },
    { value: 'fr', label: '🇫🇷 Français', name: t('common:languages.fr', 'French') },
    { value: 'ar', label: '🇲🇦 العربية', name: t('common:languages.ar', 'Arabic') },
    { value: 'de', label: '🇩🇪 Deutsch', name: t('common:languages.de', 'German') },
    { value: 'es', label: '🇪🇸 Español', name: t('common:languages.es', 'Spanish') },
    { value: 'ja', label: '🇯🇵 日本語', name: t('common:languages.ja', 'Japanese') }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contact:seo.title', 'Contact Badr Ribzat | Full-Stack Software Engineer'),
    "description": t('contact:seo.description', 'Get in touch with Badr Ribzat for career opportunities, collaborations, or project discussions. Full-Stack Software Engineer available for remote work.'),
    "url": "https://badrribzat.dev/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Badr Ribzat",
      "jobTitle": "Full-Stack Software Engineer",
      "description": t('contact:availability.status', 'Available for Full-Time, Contract, and Collaboration Opportunities'),
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+212-627-764176",
        "contactType": "Professional Contact",
        "email": "badrribzat@gmail.com",
        "availableLanguage": [
          {"@type": "Language", "name": "English", "sameAs": "en"},
          {"@type": "Language", "name": "French", "sameAs": "fr"},
          {"@type": "Language", "name": "Arabic", "sameAs": "ar"}
        ]
      },
      "sameAs": [
        "https://linkedin.com/in/badr-ribzat",
        "https://github.com/BadrRibzat"
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title={t('contact:seo.title', 'Contact | Badr Ribzat - Full-Stack Software Engineer')}
        description={t('contact:seo.description', 'Connect with me for software development opportunities, collaborations, or technical discussions. Available for full-time, contract, and remote work.')}
        keywords="contact, software engineer, full-stack developer, Morocco, job opportunities, collaborations, software development"
        image="/images/contact-og.jpg"
        structuredData={structuredData}
      />
      
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t('contact:title', 'Get In Touch')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact:subtitle', 'Whether you have a project idea, career opportunity, or just want to connect, I\'m always interested in meaningful collaborations.')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('contact:info.title', 'Contact Information')}
                </h2>

                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.label}
                        </p>
                        {info.href !== '#' ? (
                          <a
                            href={info.href}
                            className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('contact:social.title', 'Connect With Me')}
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      {t('contact:availability.status', 'Actively Seeking Opportunities')}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {t('contact:availability.message', 'Available for Full-Time, Contract, Internship, and Collaboration opportunities with visa sponsorship support.')}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('contact:form.title', 'Send Message')}
                </h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        {t('contact:form.success', 'Thank you! Your message has been sent successfully.')}
                      </span>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300 font-medium">
                        {t('contact:form.error', 'Sorry, there was an error sending your message. Please try again.')}
                      </span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact:form.name', 'Full Name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('contact:form.namePlaceholder', 'Enter your full name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact:form.email', 'Email Address')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('contact:form.emailPlaceholder', 'your.email@example.com')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact:form.subject', 'Subject')} *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('contact:form.subjectPlaceholder', 'What would you like to discuss?')}
                      />
                    </div>
                    <div>
                      <label htmlFor="opportunityType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact:form.opportunityType', 'Opportunity Type')}
                      </label>
                      <select
                        id="opportunityType"
                        name="opportunityType"
                        value={formData.opportunityType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">{t('contact:form.selectOpportunity', 'Select an option')}</option>
                        {opportunityTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact:form.preferredLanguage', 'Preferred Communication Language')}
                    </label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      {languages.map(lang => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact:form.message', 'Message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical"
                      placeholder={t('contact:form.messagePlaceholder', 'Tell me about your project, opportunity, or how I can help you...')}
                    />
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>{t('contact:form.sending', 'Sending...')}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>{t('contact:form.send', 'Send Message')}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {t('contact:form.responseTime', 'Response Time: Typically within 24-48 hours during business days')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'contact'])),
    },
  };
};

export default ContactPage;
