import { motion } from 'framer-motion';
import { ASSOCIATION_INFO } from '../constants';
import { colors } from '../config/colors';
import { fonts } from '../config/fonts';

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section title */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ fontFamily: fonts.heading, color: '#ffffff' }}
            >
              À Propos
            </h2>
            <div
              className="w-16 sm:w-24 h-1 mx-auto mb-6 sm:mb-8"
              style={{ backgroundColor: colors.secondary }}
            />
            <p
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2"
              style={{ fontFamily: fonts.body, color: '#ffffff' }}
            >
              {ASSOCIATION_INFO.description}
            </p>
          </motion.div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-16 sm:mb-20 md:mb-24">
            {/* Mission */}
            <motion.div
              variants={itemVariants}
              className="p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: '#000000', border: '2px solid #ffffff' }}
            >
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
                style={{ fontFamily: fonts.heading, color: '#ffffff' }}
              >
                Notre Mission
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ fontFamily: fonts.body, color: '#ffffff' }}
              >
                {ASSOCIATION_INFO.mission}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className="p-6 sm:p-8 md:p-10"
              style={{ backgroundColor: '#000000', border: '2px solid #ffffff' }}
            >
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
                style={{ fontFamily: fonts.heading, color: '#ffffff' }}
              >
                Notre Vision
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ fontFamily: fonts.body, color: '#ffffff' }}
              >
                {ASSOCIATION_INFO.vision}
              </p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="mt-16 sm:mt-20 md:mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-12">
              {[
                { number: '150+', label: 'Événements' },
                { number: '10k+', label: 'Communauté' },
                { number: '50+', label: 'Artistes' },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <p
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4"
                    style={{ fontFamily: fonts.heading, color: colors.secondary }}
                  >
                    {stat.number}
                  </p>
                  <p
                    className="text-base sm:text-lg md:text-xl"
                    style={{ fontFamily: fonts.body, color: '#ffffff' }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
