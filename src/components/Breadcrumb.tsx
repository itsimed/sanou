import { useEffect, useState } from 'react';
import { fonts } from '../config/fonts';
import { getEventById } from '../lib/api';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const generateBreadcrumbs = async () => {
      const path = window.location.pathname;
      const crumbs: BreadcrumbItem[] = [{ label: 'Accueil', path: '/' }];

      if (path === '/') {
        setBreadcrumbs(crumbs);
        return;
      }

      const segments = path.split('/').filter((segment) => segment);

      let skipNext = false;
      for (let index = 0; index < segments.length; index++) {
        const segment = segments[index];
        
        if (skipNext) {
          skipNext = false;
          continue;
        }

        const fullPath = '/' + segments.slice(0, index + 1).join('/');
        let label = segment;

        // Noms conviviaux pour chaque route
        if (segment === 'events') label = 'Événements';
        if (segment === 'calendar') label = 'Calendrier';
        if (segment === 'galerie') label = 'Galerie';
        if (segment === 'admin') label = 'Admin';
        
        // Pour les événements, ajouter "Événement" puis le titre depuis la BD
        if (segment === 'event' && segments[index + 1]) {
          // Ajouter le lien "Événement" qui renvoit vers /events
          crumbs.push({ label: 'Événement', path: '/events' });
          
          const eventId = segments[index + 1];
          try {
            const event = await getEventById(eventId);
            label = event.title;
          } catch (error) {
            label = 'Événement';
          }
          skipNext = true;
        }

        crumbs.push({ label, path: fullPath });
      }

      setBreadcrumbs(crumbs);
    };

    generateBreadcrumbs();
    window.addEventListener('popstate', generateBreadcrumbs);
    return () => window.removeEventListener('popstate', generateBreadcrumbs);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      className="bg-black border-b-2 border-white"
      style={{ fontFamily: fonts.body }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-white">/</span>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-white font-semibold">{crumb.label}</span>
              ) : (
                <button
                  onClick={() => handleNavigate(crumb.path)}
                  className="text-white hover:text-gray-300 hover:underline transition-colors"
                >
                  {crumb.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
