import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type ContrastLevel = 'normal' | 'medium' | 'high';

export interface AccessibilitySettings {
  contrast: ContrastLevel;
  monochrome: boolean;
  textSize: number; // 100-150
  lineHeight: number; // 1-2.5
  letterSpacing: number; // 0-0.15
  enlargedCursor: boolean;
  highlightLinks: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  contrast: 'normal',
  monochrome: false,
  textSize: 100,
  lineHeight: 1,
  letterSpacing: 0,
  enlargedCursor: false,
  highlightLinks: false,
};

const STORAGE_KEY = 'sanouva-a11y-settings';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (err) {
        console.error('Erreur chargement a11y settings:', err);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder + appliquer au DOM
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applySettings(settings);
  }, [settings, isLoaded]);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    root.setAttribute('data-contrast', newSettings.contrast);
    root.setAttribute('data-monochrome', newSettings.monochrome ? 'on' : 'off');
    root.style.fontSize = `${newSettings.textSize}%`;
    root.style.setProperty('--a11y-line-height', newSettings.lineHeight.toString());
    root.style.letterSpacing = `${newSettings.letterSpacing}em`;
    root.setAttribute('data-cursor-enlarged', newSettings.enlargedCursor ? 'on' : 'off');
    root.setAttribute('data-links-highlighted', newSettings.highlightLinks ? 'on' : 'off');
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        updateSetting,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used inside AccessibilityProvider');
  return ctx;
}
