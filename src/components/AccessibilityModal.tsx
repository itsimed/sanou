import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';
import '../styles/accessibility.css';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function AccessibilityModal() {
  const { settings, isModalOpen, closeModal, updateSetting, resetSettings } = useAccessibility();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isModalOpen, closeModal]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="a11y-overlay"
          onMouseDown={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={false}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-title"
            aria-describedby="a11y-description"
            className="a11y-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <header className="a11y-header">
              <img src="/logo.webp" alt="Sanouva Bien" className="a11y-logo" />
              <div>
                <h1 id="a11y-title" className="a11y-sr-only">
                  Parametres d'accessibilite
                </h1>
                <p id="a11y-description" className="a11y-sr-only">
                  Reglages de contraste, typographie et aides visuelles du site.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className="a11y-close-btn"
                aria-label="Fermer le menu d'accessibilite"
              >
                <span aria-hidden="true">X</span>
              </button>
            </header>

            <div className="a11y-body">
              <section className="a11y-section" aria-labelledby="a11y-contrast-title">
                <div className="a11y-section-heading">
                  <h2 id="a11y-contrast-title">Contrastes et couleurs</h2>
                  <p>Choisir le niveau de contraste et simplifier les couleurs du site.</p>
                </div>

                <fieldset className="a11y-row">
                  <legend className="a11y-label">Contraste</legend>
                  <div className="a11y-options" role="radiogroup" aria-label="Contraste">
                    {(['normal', 'medium', 'high'] as const).map((level) => (
                      <label key={level} className="a11y-option">
                        <span>
                          {level === 'normal' ? 'Clair' : level === 'medium' ? 'Sombre' : 'Eleve'}
                        </span>
                        <input
                          type="radio"
                          name="contrast"
                          value={level}
                          checked={settings.contrast === level}
                          onChange={() => updateSetting('contrast', level)}
                          className="a11y-check"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="a11y-row">
                  <legend className="a11y-label">Mode monochrome</legend>
                  <div className="a11y-options a11y-options-two" role="radiogroup" aria-label="Mode monochrome">
                    <label className="a11y-option">
                      <span>Desactive</span>
                      <input
                        type="radio"
                        name="monochrome"
                        checked={!settings.monochrome}
                        onChange={() => updateSetting('monochrome', false)}
                        className="a11y-check"
                      />
                    </label>
                    <label className="a11y-option">
                      <span>Active</span>
                      <input
                        type="radio"
                        name="monochrome"
                        checked={settings.monochrome}
                        onChange={() => updateSetting('monochrome', true)}
                        className="a11y-check"
                      />
                    </label>
                  </div>
                </fieldset>
              </section>

              <section className="a11y-section" aria-labelledby="a11y-type-title">
                <div className="a11y-section-heading">
                  <h2 id="a11y-type-title">Lecture</h2>
                  <p>Ajuster la taille, l'interligne et l'espacement du texte.</p>
                </div>

                <div className="a11y-row">
                  <label htmlFor="a11y-text-size" className="a11y-label">
                    Taille de texte
                  </label>
                  <div className="a11y-slider-group">
                    <span className="a11y-slider-edge">100 %</span>
                    <input
                      id="a11y-text-size"
                      type="range"
                      min="100"
                      max="150"
                      value={settings.textSize}
                      onChange={(event) => updateSetting('textSize', Number(event.target.value))}
                      className="a11y-slider"
                      aria-valuemin={100}
                      aria-valuemax={150}
                      aria-valuenow={settings.textSize}
                      aria-valuetext={`${settings.textSize} pour cent`}
                    />
                    <span className="a11y-slider-edge">150 %</span>
                  </div>
                </div>

                <div className="a11y-row">
                  <label htmlFor="a11y-line-height" className="a11y-label">
                    Interlignage
                  </label>
                  <div className="a11y-slider-group">
                    <span className="a11y-slider-edge">Normal</span>
                    <input
                      id="a11y-line-height"
                      type="range"
                      min="1"
                      max="2.5"
                      step="0.1"
                      value={settings.lineHeight}
                      onChange={(event) => updateSetting('lineHeight', Number(event.target.value))}
                      className="a11y-slider"
                      aria-valuemin={1}
                      aria-valuemax={2.5}
                      aria-valuenow={settings.lineHeight}
                      aria-valuetext={settings.lineHeight === 1 ? 'Normal' : settings.lineHeight.toFixed(1)}
                    />
                    <span className="a11y-slider-edge">2.5</span>
                  </div>
                </div>

                <div className="a11y-row">
                  <label htmlFor="a11y-letter-spacing" className="a11y-label">
                    Espacement
                  </label>
                  <div className="a11y-slider-group">
                    <span className="a11y-slider-edge">Normal</span>
                    <input
                      id="a11y-letter-spacing"
                      type="range"
                      min="0"
                      max="0.15"
                      step="0.01"
                      value={settings.letterSpacing}
                      onChange={(event) => updateSetting('letterSpacing', Number(event.target.value))}
                      className="a11y-slider"
                      aria-valuemin={0}
                      aria-valuemax={0.15}
                      aria-valuenow={settings.letterSpacing}
                      aria-valuetext={settings.letterSpacing === 0 ? 'Normal' : `${settings.letterSpacing.toFixed(2)} em`}
                    />
                    <span className="a11y-slider-edge">0.15em</span>
                  </div>
                </div>
              </section>

              <section className="a11y-section a11y-section-last" aria-labelledby="a11y-visual-title">
                <div className="a11y-section-heading">
                  <h2 id="a11y-visual-title">Aides visuelles</h2>
                  <p>Rendre le pointeur et les liens plus faciles a reperer.</p>
                </div>

                <fieldset className="a11y-row">
                  <legend className="a11y-label">Curseur agrandi</legend>
                  <div className="a11y-options a11y-options-two" role="radiogroup" aria-label="Curseur agrandi">
                    <label className="a11y-option">
                      <span>Desactive</span>
                      <input
                        type="radio"
                        name="cursor"
                        checked={!settings.enlargedCursor}
                        onChange={() => updateSetting('enlargedCursor', false)}
                        className="a11y-check"
                      />
                    </label>
                    <label className="a11y-option">
                      <span>Active</span>
                      <input
                        type="radio"
                        name="cursor"
                        checked={settings.enlargedCursor}
                        onChange={() => updateSetting('enlargedCursor', true)}
                        className="a11y-check"
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="a11y-row">
                  <legend className="a11y-label">Mise en evidence des liens</legend>
                  <div
                    className="a11y-options a11y-options-two"
                    role="radiogroup"
                    aria-label="Mise en evidence des liens"
                  >
                    <label className="a11y-option">
                      <span>Desactive</span>
                      <input
                        type="radio"
                        name="links"
                        checked={!settings.highlightLinks}
                        onChange={() => updateSetting('highlightLinks', false)}
                        className="a11y-check"
                      />
                    </label>
                    <label className="a11y-option">
                      <span>Active</span>
                      <input
                        type="radio"
                        name="links"
                        checked={settings.highlightLinks}
                        onChange={() => updateSetting('highlightLinks', true)}
                        className="a11y-check"
                      />
                    </label>
                  </div>
                </fieldset>
              </section>

              <div className="a11y-actions">
                <button type="button" onClick={resetSettings} className="a11y-reset-btn">
                  Reinitialiser
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
