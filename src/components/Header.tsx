import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../constants";
import { fonts } from "../config/fonts";
import { useAccessibility } from "../context/AccessibilityContext";

import "./Header.css";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useAccessibility();
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="w-full bg-black text-white sticky top-0 z-50">
      <div className="w-full relative z-50 bg-black">
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center flex-shrink-0">
            <img src="/logo.webp" alt="Asanup Logo" className="w-32 h-auto" />
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-12 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                style={{ fontFamily: fonts.heading }}
                className={"nav-link text-base md:text-lg lg:text-xl font-medium " + (isActive(link.href) ? "active" : "")}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-accessibility hidden md:flex"
              title="Options d'accessibilitÃ©"
              aria-label="Options d'accessibilitÃ©"
              onClick={openModal}
            >
              <img src="/a11y.svg" alt="AccessibilitÃ©" />
            </motion.button>

            <button
              className="hamburger-menu md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={"hamburger-line " + (isMobileMenuOpen ? "open" : "")}></span>
              <span className={"hamburger-line " + (isMobileMenuOpen ? "open" : "")}></span>
              <span className={"hamburger-line " + (isMobileMenuOpen ? "open" : "")}></span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black flex flex-col md:hidden"
          >
            <div className="h-20"></div>

            <div className="flex-1 flex flex-col items-center justify-center gap-12 px-6 py-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  style={{ fontFamily: fonts.heading }}
                  className="text-4xl sm:text-5xl font-medium hover:opacity-70 transition-opacity active-mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pb-8 pt-8 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className="mobile-accessibility-btn text-white text-xl underline hover:opacity-70 transition-opacity tracking-widest font-semibold"
              >
                Accessibilité
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}