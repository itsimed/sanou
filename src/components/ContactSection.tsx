import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContactFormData } from '../types';
import { colors } from '../config/colors';
import { fonts } from '../config/fonts';

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitMessage('Merci ! Votre message a été envoyé avec succès.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

  return (
    <section
      className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <h2
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: fonts.heading, color: '#ffffff' }}
            >
              Restez en Contact
            </h2>
            <div
              className="w-24 h-1 mx-auto mb-8"
              style={{ backgroundColor: colors.secondary }}
            />
            <p
              className="text-xl"
              style={{ fontFamily: fonts.body, color: '#ffffff' }}
            >
              Avez des questions ? N'hésitez pas à nous contacter
            </p>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-black border-2 border-white p-8 md:p-12 shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Message de succès */}
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 text-green-400 border-2 border-green-400"
                style={{ fontFamily: fonts.body, backgroundColor: '#000000' }}
              >
                {submitMessage}
              </motion.div>
            )}

            {/* Nom et Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold mb-2"
                  style={{ fontFamily: fonts.body, color: '#ffffff' }}
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-white focus:outline-none focus:border-opacity-0 transition"
                  style={{ fontFamily: fonts.body, backgroundColor: '#000000', color: '#ffffff' }}
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold mb-2"
                  style={{ fontFamily: fonts.body, color: '#ffffff' }}
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-white focus:outline-none transition"
                  style={{ fontFamily: fonts.body, backgroundColor: '#000000', color: '#ffffff' }}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold mb-2"
                style={{ fontFamily: fonts.body, color: '#ffffff' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-white focus:outline-none transition text-sm"
                style={{ fontFamily: fonts.body, backgroundColor: '#000000', color: '#ffffff' }}
                placeholder="votre.email@example.com"
              />
            </div>

            {/* Téléphone */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-semibold mb-2"
                style={{ fontFamily: fonts.body, color: '#ffffff' }}
              >
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-white focus:outline-none transition text-sm"
                style={{ fontFamily: fonts.body, backgroundColor: '#000000', color: '#ffffff' }}
                placeholder="+33 1 23 45 67 89"
              />
            </div>

            {/* Sujet */}
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-semibold mb-2"
                style={{ fontFamily: fonts.body, color: '#ffffff' }}
              >
                Sujet
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-white focus:outline-none transition text-sm"
                style={{ fontFamily: fonts.body, backgroundColor: '#000000', color: '#ffffff' }}
              >
                <option value="" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Sélectionnez un sujet</option>
                <option value="general" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Demande générale</option>
                <option value="partnership" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Partenariat</option>
                <option value="event" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Organisation d'événement</option>
                <option value="other" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Autre</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-semibold mb-2"
                style={{ fontFamily: fonts.body, color: '#ffffff' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-white focus:outline-none resize-none transition text-sm"
                style={{ fontFamily: fonts.body, backgroundColor: '#000000', color: '#ffffff' }}
                placeholder="Votre message..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 font-semibold text-white transition text-sm sm:text-base border-2 border-white"
              style={{
                fontFamily: fonts.body,
                backgroundColor: '#ffffff',
                color: '#000000',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
