# Guide de Déploiement - Projet Sanou

## Structure du projet
- **Frontend (Vite + React + TypeScript)** → `/dist` (prêt pour production)
- **Backend (Express + MongoDB)** → `/backend`

## Prérequis sur le serveur
- Node.js (v18+)
- npm ou yarn
- MongoDB (local ou distant)
- Un serveur web (Nginx ou Apache) OU Node.js directement

## Option 1 : Déploiement complet (Recommandé)

### 1. Copier le projet sur le serveur
```bash
/home/imed/sanou/
├── dist/          # Frontend compilé (statique)
├── backend/       # API Express
├── package.json
└── .env.production
```

### 2. Installation du backend
```bash
cd /home/imed/sanou/backend
npm install
```

### 3. Configuration
Créer `/home/imed/sanou/.env.production`:
```env
VITE_API_URL=http://handiman.univ-paris8.fr/api
# ou
VITE_API_URL=http://10.10.2.220/api
```

### 4. Lancer le backend
```bash
cd /home/imed/sanou/backend
npm start
# ou avec PM2 pour persistance
pm2 start server.js --name "sanou-api"
```

### 5. Servir le frontend (option Nginx)
```nginx
server {
    listen 80;
    server_name handiman.univ-paris8.fr;
    
    root /home/imed/sanou/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:5000/api/;
    }
}
```

## Option 2 : Frontend uniquement (si backend est déjà en place)

Copier seulement `/dist` sur le serveur web (Apache public_html ou Nginx root)

## Variables d'environnement importantes

### Frontend (.env.production)
```env
VITE_API_URL=http://[serveur]/api
```

### Backend (backend/.env)
```env
MONGODB_URI=mongodb://localhost:27017/sanou
PORT=5000
```

## Fichiers à copier au minimum

```
✓ dist/                    # Build compilé
✓ backend/                 # Code API
✓ package.json            # Dépendances
✓ .env.production         # Config prod
```

## Fichiers NON nécessaires
```
✗ node_modules/           # Généré localement
✗ src/                     # Code source (déjà compilé)
✗ .git/                    # Contrôle de version
✗ .env.local              # Config de dev
```

## Vérification du déploiement

1. **Frontend accessible** : `http://10.10.2.220` ou `http://handiman.univ-paris8.fr`
2. **API accessible** : `http://10.10.2.220/api/events`
3. **Logs du backend** : `pm2 logs sanou-api`

## Problèmes courants

### API ne répond pas
- Vérifier que le backend tourne : `lsof -i :5000`
- Vérifier la route proxy Nginx
- Vérifier MongoDB

### Frontend affiche une page blanche
- Vérifier `VITE_API_URL` en dev tools (Console)
- Vérifier les droits des fichiers

### Les images ne chargent pas
- Vérifier le dossier `/public` est copié
- Vérifier les chemins relatifs

---
**Pour plus d'infos** : consulter les README dans `/backend` et `/`
