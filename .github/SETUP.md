# GitHub Actions

## Workflows

### build.yml - Build & Test
**Déclencheurs :** Push sur `main`/`develop`, Pull Requests
- ✅ Tests backend PHP
- ✅ Build frontend React
- ✅ Build images Docker
- ✅ Validation Kubernetes

### deploy.yml - Déploiement
**Déclencheurs :** Manuel, Release
- 🚀 Build images avec tags
- 📦 Génération des manifestes

## Aucune configuration requise
Tous les workflows fonctionnent sans secrets.