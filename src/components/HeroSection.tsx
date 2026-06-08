import { motion } from 'framer-motion';
import { ASSOCIATION_INFO } from '../constants';
import { fonts } from '../config/fonts';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background - Fullscreen image */}
      <div className="absolute inset-0 w-screen h-full bg-cover bg-center bg-no-repeat">
        <img
          src="/background hero.webp"
          alt="Concert background"
          className="w-full h-full object-cover animate-fade-in"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(0, 0, 0, 0.9) 0%,
                rgba(0, 0, 0, 0.85) 25%,
                rgba(0, 0, 0, 0.7) 50%,
                rgba(0, 0, 0, 0.4) 75%,
                rgba(0, 0, 0, 0.2) 100%
              )
            `,
          }}
        />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 min-h-fit max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 md:py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content - Tagline */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.h2
            variants={textVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8"
            style={{
              fontFamily: fonts.heading,
              color: '#FFFFFF',
              lineHeight: '1.15',
            }}
          >
            {ASSOCIATION_INFO.tagline}
          </motion.h2>

          <motion.p
            variants={textVariants}
            className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 max-w-md mb-6 sm:mb-8 md:mb-12 leading-relaxed"
            style={{ fontFamily: fonts.body }}
          >
            Découvrez une nouvelle façon de vivre la culture et l'art avec notre communauté.
          </motion.p>
        </div>
      </motion.div>

      {/* Buttons - Bottom of Hero */}
      <motion.div
        className="absolute bottom-40 md:bottom-28 left-0 right-0 z-20 w-full flex flex-col gap-6 sm:gap-4 px-4 sm:px-6 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* MOBILE: Faire un Don - EN HAUT */}
        <motion.a
          href="https://www.helloasso.com/associations/sanou-va-bien"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-don btn-don-mobile md:hidden inline-flex items-center justify-center w-full sm:w-auto"
          aria-label="Faire un don à l'association (ouvre une nouvelle fenêtre)"
        >
          <span>Faire un Don</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </motion.a>

        {/* MOBILE: Découvrir - EN BAS */}
        <motion.a
          href="/events"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 sm:px-10 py-5 sm:py-4 bg-white text-black font-semibold hover:bg-gray-50 transition text-xs sm:text-base border-2 border-white rounded-sm inline-flex items-center justify-center md:hidden w-full sm:w-auto"
          style={{ fontFamily: fonts.body }}
          aria-label="Découvrir nos événements"
        >
          Découvrir
        </motion.a>

        {/* DESKTOP: Flex Row pour les deux boutons */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center justify-center">
          {/* DESKTOP: Découvrir */}
          <motion.a
            href="/events"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 sm:px-10 py-4 sm:py-4 bg-white text-black font-semibold hover:bg-gray-50 transition text-xs sm:text-base border-2 border-white rounded-sm inline-flex items-center justify-center"
            style={{ fontFamily: fonts.body }}
            aria-label="Découvrir nos événements"
          >
            Découvrir
          </motion.a>

          {/* DESKTOP: Faire un Don */}
          <motion.a
            href="https://www.helloasso.com/associations/sanou-va-bien"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-don inline-flex items-center justify-center"
            aria-label="Faire un don à l'association (ouvre une nouvelle fenêtre)"
          >
            <span>Faire un Don</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}