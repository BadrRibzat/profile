'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to create your international portfolio? Let's get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="card mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">contact@badrribzat.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🌍</span>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">International Remote</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">💼</span>
                  <div>
                    <p className="font-medium text-gray-900">LinkedIn</p>
                    <p className="text-gray-600">linkedin.com/in/badrribzat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages Supported */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Languages Supported</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '🇺🇸 English',
                  '🇪🇸 Español', 
                  '🇫🇷 Français',
                  '🇩🇪 Deutsch',
                  '🇸🇦 العربية',
                  '🇨🇳 中文',
                  '🇯🇵 日本語'
                ].map((lang, index) => (
                  <div key={index} className="text-sm text-gray-600 py-1">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for your message. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      📨 {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}