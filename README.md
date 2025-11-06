# API de Gestion de Contacts

Une API Laravel pour gérer des contacts et des groupes avec le pattern Repository.

## Structure du projet

```
ntodo/
├── backend/          # Application Laravel
├── frontend/         # Application React
├── database/         # Configuration MySQL
└── README.md
```

## Installation

### Méthode 1: Docker (Recommandée)

```bash
# Démarrer tous les services
docker-compose up --build -d

# Exécuter les migrations
docker-compose exec backend php artisan migrate
```

Ou utiliser le script de démarrage :
```bash
# Windows
start.bat
```

### Méthode 2: Installation manuelle

```bash
# 1. Base de données
cd database && docker-compose up -d

# 2. Backend Laravel
cd backend && composer install && php artisan migrate && php artisan serve

# 3. Frontend React
cd frontend && npm install && npm start
```

L'application sera accessible sur http://localhost:3000

## Endpoints API

### Groupes

- `GET /api/groups` - Liste tous les groupes
- `POST /api/groups` - Créer un nouveau groupe
- `GET /api/groups/{id}` - Afficher un groupe
- `PUT /api/groups/{id}` - Mettre à jour un groupe
- `DELETE /api/groups/{id}` - Supprimer un groupe

### Contacts

- `GET /api/contacts` - Liste tous les contacts
- `POST /api/contacts` - Créer un nouveau contact
- `GET /api/contacts/{id}` - Afficher un contact
- `PUT /api/contacts/{id}` - Mettre à jour un contact
- `DELETE /api/contacts/{id}` - Supprimer un contact
- `GET /api/groups/{groupId}/contacts` - Contacts d'un groupe

## Exemples d'utilisation

### Créer un groupe
```json
POST /api/groups
{
    "name": "Famille",
    "description": "Contacts familiaux"
}
```

### Créer un contact
```json
POST /api/contacts
{
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@email.com",
    "phone": "0123456789",
    "address": "123 Rue de la Paix",
    "group_id": 1
}
```

## Configuration de la base de données

- Host: localhost:3306
- Database: contacts_db
- Username: contacts_user
- Password: contacts_password

## Tests

### Exécuter les tests

```bash
cd backend
php artisan test
```

### Tests disponibles

- **GroupTest** : Tests CRUD pour les groupes
- **ContactTest** : Tests CRUD pour les contacts  
- **ApiIntegrationTest** : Test de workflow complet

### Couverture des tests

- ✅ Création, lecture, mise à jour, suppression
- ✅ Validation des données
- ✅ Relations entre groupes et contacts
- ✅ Gestion des erreurs
- ✅ Workflow d'intégration complet