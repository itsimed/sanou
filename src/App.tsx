import { useState, useEffect } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AccessibilityModal } from './components/AccessibilityModal';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './layout/HomePage';
import { EventsPage } from './pages/EventsPage';
import { CalendarPage } from './pages/CalendarPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { AdminPage } from './pages/AdminPage';
import GalleryPage from './pages/GalleryPage';

function AppContent() {
  // On utilise un état (useState) pour que React re-projete la bonne page dès que l'URL change
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Écoute les boutons "Précédent" / "Suivant" du navigateur et les changements d'historique
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Analyse dynamique du chemin (sans useMemo restrictif)
  if (currentPath.startsWith('/admin')) {
    return <AdminPage />;
  }
  
  if (currentPath.startsWith('/event/')) {
    const eventId = currentPath.replace('/event/', '');
    return <EventDetailPage eventId={eventId} />;
  }

  if (currentPath.startsWith('/calendar')) {
    return <CalendarPage />;
  }
  
  if (currentPath.startsWith('/events')) {
    return <EventsPage />;
  }

  // Ta nouvelle route galerie fonctionne maintenant parfaitement
  if (currentPath.startsWith('/galerie')) {
    return <GalleryPage />;
  }
  
  // Page par défaut
  return <HomePage />;
}

function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
      <AccessibilityModal />
      <ScrollToTop />
    </AccessibilityProvider>
  );
}

export default App;
