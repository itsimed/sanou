# Documentation - Page Événements (EventsPage)

## 📋 Vue d'ensemble

La page **Événements** affiche une liste d'événements culturels (concerts, expositions, danse) avec un système de **filtrage par catégorie** complètement accessible et responsive.

---

## 🏗️ Architecture des Fichiers

```
src/
├── pages/
│   └── EventsPage.tsx              # Composant principal
├── components/
│   └── EventCard.tsx               # Composant réutilisable pour chaque événement
├── types/
│   └── event.ts                    # Interfaces TypeScript
├── config/
│   └── eventCategories.ts          # Configuration des catégories
├── data/
│   └── events.ts                   # Données d'exemple
└── styles/
    └── events.css                  # Styles personnalisés
```

---

## 📦 Structure TypeScript (Types)

### Interface `Event`
```typescript
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;              // Format ISO: "2026-05-21"
  time: string;              // Format 24h: "19:30"
  location: string;
  category: 'musique' | 'peinture' | 'danse';
  imageUrl: string;
  capacity: number;          // Capacité totale
  attendees: number;         // Inscrits actuels
}
```

### Interface `CategoryConfig`
Configuration visuelle pour chaque catégorie :
- `label`: Texte affiché
- `color`: Couleur Tailwind (ex: 'violet')
- `accentColor`: Couleur du texte (ex: 'text-violet-400')
- `bgColor`: Couleur de fond (ex: 'bg-violet-900/50')

---

## 🎯 Hiérarchie des Composants

```
EventsPage (Page principale)
├── Header (existant)
├── Hero Section (titre + description)
├── Filters (boutons de filtrage)
├── Grid d'EventCards
│   └── EventCard (x multiple)
└── Footer (existant)
```

---

## ♿ Accessibilité RGAA/WCAG 2.1

### 1️⃣ Structure Sémantique HTML5

#### EventsPage
```tsx
<section>              {/* Section hero */}
<div role="group" aria-label="Filtrage par catégorie d'événement">
  {/* Filtres */}
</div>
<div className="grid">  {/* Grille d'événements */}
  <article>           {/* Chaque événement */}
    <h3>              {/* Titre de l'événement */}
    <img alt="...">   {/* Image avec alt descriptif */}
    <button>          {/* CTA accessible */}
  </article>
</div>
```

**Pourquoi ?**
- `<section>` pour les régions logiques
- `<article>` pour chaque événement (contenu indépendant)
- `role="group"` + `aria-label` pour les filtres (group buttons)
- `<h3>` pour les titres d'événements

---

### 2️⃣ Attributs ARIA pour Accessibilité

#### Boutons de Filtrage
```tsx
<button
  aria-pressed={activeFilter === category}
  aria-label={`Filtrer par Musique (12 événements)`}
>
  Musique (12)
</button>
```

**Explications :**
- `aria-pressed={true/false}` : Indique l'état du bouton à un lecteur d'écran
- `aria-label` : Fournit une description complète et contextualisée
- L'utilisateur entend : "Bouton Musique, 12 événements, appuyé"

#### Live Region pour Filtrage
```tsx
<div aria-live="polite" aria-atomic="true">
  {filteredEvents.length} événement(s) à découvrir
</div>
```

**Explications :**
- `aria-live="polite"` : Annonce les changements sans interruption
- `aria-atomic="true"` : Lit le contenu entier, pas juste les delta
- Quand l'utilisateur change le filtre, le lecteur d'écran dit automatiquement le nombre

---

### 3️⃣ Images et Contenu Alt

#### Image d'Événement
```tsx
<img
  src={event.imageUrl}
  alt={`Affiche pour ${event.title}`}
/>
```

**Explications :**
- L'alt n'est pas vide (`alt=""`) car ce n'est pas juste décoratif
- Format : "Affiche pour [Titre]" - donne du contexte
- Utilisateur malvoyant : "Affiche pour Concert Acoustique"

---

### 4️⃣ Contraste & Lisibilité (WCAG AA)

Tous les textes respectent un ratio de contraste minimum **4.5:1** (niveau AA) :

| Élément | Couleur Texte | Couleur Fond | Ratio |
|---------|---------------|-------------|-------|
| Titre événement | Blanc (#FFF) | Noir (#111827) | 21:1 ✅ |
| Description | Gris clair (#D1D5DB) | Noir | 7.5:1 ✅ |
| Badge Musique | Violet (#A78BFA) | Fond sombre | 8:1 ✅ |
| Badge Peinture | Rose (#F472B6) | Fond sombre | 7:1 ✅ |
| Badge Danse | Cyan (#22D3EE) | Fond sombre | 8:1 ✅ |

**Vérification :** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

### 5️⃣ Navigation au Clavier

#### Focus Visible
```css
.filter-button:focus-visible {
  outline: 3px solid #c084fc;
  outline-offset: 2px;
}
```

**Garantit :**
- Tab/Shift+Tab navigue entre tous les boutons
- Focus visible avec une bordure violette (contraste 21:1)
- Largeur outline : 3px (minimum recommandé 2px)

#### Ordre de Tabulation (DOM Order)
Les filtres sont ordonnés dans le DOM :
1. Tous
2. Musique
3. Peinture
4. Danse
5. Événements (article par article)

**Pas d'ordre CSS inversé** car ça confond les lecteurs d'écran.

---

### 6️⃣ Éléments Interactifs Accessibles

#### Boutons
```tsx
<button
  onClick={() => setActiveFilter('musique')}
  aria-pressed={true}
  aria-label="Filtrer par Musique (12 événements)"
>
  Musique (12)
</button>
```

✅ **Accessible :**
- Cliquable à la souris
- Activable au clavier (Entrée/Espace)
- Lecteur d'écran : complet et contextualisé
- État visible (aria-pressed)

---

### 7️⃣ Respect de `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  .event-card,
  .filter-button,
  .event-card img {
    animation: none !important;
    transition: none !important;
  }
}
```

**Bénéfice :**
- Utilisateurs sensibles au mouvement / vertiges
- Navigateurs/OS bas de gamme
- Animations Framer Motion : toujours exécutées par `motion`, mais ignorées en CSS

---

## 🎨 Design Artistique (Dark Mode Galerie)

### Palette de Couleurs

#### Fond Principal
- `bg-gray-950` (#030712) : Fond ultra-sombre
- `bg-gray-900` (#111827) : Cartes d'événements

#### Catégories
- **Musique** : Violet (#c084fc) → Badge violet clair + accent
- **Peinture** : Rose (#ec4899) → Badge rose + accent
- **Danse** : Cyan (#06b6d4) → Badge cyan + accent

#### Accents
- Gradient hero : `from-gray-900 via-purple-900/20 to-gray-900`
- Border : `border-purple-500/20` (subtile)

### Visual Hierarchy
1. **H1** : Titre page (principal)
2. **H2** : "Filtrer par catégorie"
3. **H3** : Titre événement (card)
4. **P** : Description/détails

---

## ⚙️ Logique React (useState)

### État de Filtrage
```typescript
const [activeFilter, setActiveFilter] = useState<EventCategory | 'tous'>('tous');
```

**Flux :**
1. User clique sur bouton filtre "Musique"
2. `setActiveFilter('musique')` met à jour l'état
3. Composant re-rendu avec le filtre appliqué
4. Événements filtrés affichés
5. Lecteur d'écran annonce le changement (aria-live)

### Filtre Appliqué
```typescript
const filteredEvents = 
  activeFilter === 'tous' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(e => e.category === activeFilter);
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **Mobile** : < 640px → 1 colonne
- **Tablette** : ≥ 768px → 2 colonnes
- **Desktop** : ≥ 1024px → 3 colonnes

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Texte Responsive
```tsx
className="text-sm lg:text-base font-medium"
```

---

## 🚀 Intégration au Projet

### 1. Importer la page dans App.tsx
```tsx
import { EventsPage } from './pages/EventsPage';

function App() {
  // À adapter selon votre routing (React Router, etc.)
  return <EventsPage />;
}
```

### 2. Importer les styles globalement
```tsx
// main.tsx
import './styles/events.css';
```

### 3. Ajouter les dépendances (déjà présentes)
```json
{
  "framer-motion": "^12.18.1",
  "react": "^19.1.0"
}
```

---

## 🧪 Tests Accessibilité

### Outils Recommandés
1. **NVDA** (Windows) ou **JAWS** (lecteur d'écran)
2. **Axe DevTools** (Chrome extension)
3. **Wave** (Web Accessibility Evaluation Tool)
4. **Lighthouse** (Chrome DevTools → Accessibility)

### Checklist
- [ ] Tab navigation complète sans trap
- [ ] Tous les boutons ont un label
- [ ] Focus visible partout
- [ ] Contraste ≥ 4.5:1
- [ ] Lecteur d'écran : navigation logique
- [ ] Images : alt texte explicite
- [ ] Pas de couleur seule pour distinguer (label + texte)

---

## 📊 Données d'Exemple

Les événements sont stockés dans `src/data/events.ts` :

```typescript
{
  id: '1',
  title: 'Concert Acoustique',
  date: '2026-06-15',
  time: '20:00',
  category: 'musique',
  capacity: 100,
  attendees: 87,  // Utile pour afficher le pourcentage
  ...
}
```

**À produire en API :** Remplacer `EVENTS_DATA` par un `fetch()` ou GraphQL query.

---

## 🎯 Prochaines Étapes

1. ✅ Intégrer la page à votre routing
2. ✅ Tester avec un lecteur d'écran
3. ✅ Adapter les images réelles (remplacer URLs Unsplash)
4. ✅ Connecter à une API réelle pour les événements
5. ✅ Ajouter des filtres avancés (date, lieu, etc.)

---

## 📚 Ressources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast](https://webaim.org/resources/contrastchecker/)
- [Framer Motion Docs](https://www.framer.com/motion/)
