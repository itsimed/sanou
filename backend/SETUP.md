# Setup Backend Sanouva Bien

## Prérequis

- Node.js (v14+)
- MongoDB (local ou cloud)

## Installation

1. **Accédez au dossier backend**
   ```bash
   cd backend
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Créez un fichier `.env`**
   ```bash
   cp .env.example .env
   ```

4. **Configurez vos variables d'environnement**
   - `MONGODB_URI`: Votre URL de connexion MongoDB
   - `ADMIN_CODE`: Code d'accès admin (par défaut: "admin")
   - `PORT`: Port du serveur (par défaut: 5000)

## Démarrage

**Mode développement** (avec auto-reload):
```bash
npm run dev
```

**Mode production**:
```bash
npm start
```

Le serveur démarrera sur `http://localhost:5000`

## API Endpoints

### Événements (GET - Public)
- `GET /api/events` - Récupérer tous les événements
- `GET /api/events/:id` - Récupérer un événement par ID

### Événements (POST/PUT/DELETE - Admin)
- `POST /api/events` - Créer un événement
  - Header: `x-admin-code: admin`
  - Body: Event data
  
- `PUT /api/events/:id` - Modifier un événement
  - Header: `x-admin-code: admin`
  - Body: Updated event data
  
- `DELETE /api/events/:id` - Supprimer un événement
  - Header: `x-admin-code: admin`

## MongoDB Atlas (Optionnel)

Pour utiliser MongoDB Cloud:

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster
3. Récupérez la chaîne de connexion
4. Remplacez `MONGODB_URI` dans le `.env`

Exemple:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sanouva_bien
```

## Prochaines étapes

- [ ] Tester les routes API avec Postman/Insomnia
- [ ] Intégrer les appels API depuis la page admin frontend
- [ ] Ajouter validation avancée des données
- [ ] Mettre en place la gestion des erreurs globale
- [ ] Ajouter des logs détaillés
