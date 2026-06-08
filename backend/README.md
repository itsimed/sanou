# Backend Sanouva Bien

Backend Node.js avec MongoDB pour la gestion des événements.

## Structure

```
backend/
├── models/           # Modèles MongoDB
├── routes/           # Routes API
├── controllers/      # Logique métier
├── middleware/       # Middleware (authentification, etc.)
├── config/           # Configuration (DB, env)
├── utils/            # Utilitaires
├── server.js         # Fichier principal
└── package.json      # Dépendances
```

## Fonctionnalités

- Authentification admin (code d'accès)
- CRUD événements (Create, Read, Update, Delete)
- Connexion MongoDB
- Validation des données

## Dépendances

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5"
}
```

## Prochaines étapes

1. Installer les dépendances: `npm install`
2. Créer un fichier `.env` avec les variables d'environnement
3. Développer les routes API
4. Intégrer avec la page admin frontend
