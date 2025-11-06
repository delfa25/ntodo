# Guide de déploiement Docker

## Corrections apportées pour la communication inter-conteneurs

### 1. Configuration réseau Docker
- Ajout d'un réseau personnalisé `contacts_network`
- Configuration des health checks pour MySQL
- Dépendances appropriées entre services

### 2. Variables d'environnement
- Frontend: `REACT_APP_API_URL` configurable
- Backend: `FRONTEND_URL` pour CORS
- Configuration MySQL via variables d'environnement

### 3. Configuration CORS
- Support des URLs de conteneurs Docker
- `supports_credentials: true` pour l'authentification

### 4. Scripts d'entrée
- `docker-entrypoint.sh` pour le backend avec attente MySQL
- Migrations automatiques au démarrage

### 5. Dockerfiles optimisés
- Multi-stage builds
- Gestion des dépendances
- Variables d'environnement build-time

## Démarrage

```bash
# Windows
start.bat

# Unix/Linux/Mac
chmod +x start.sh
./start.sh
```

## URLs d'accès
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Base de données: localhost:3306

## Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart backend

# Accéder au conteneur backend
docker-compose exec backend bash

# Exécuter des migrations manuellement
docker-compose exec backend php artisan migrate
```