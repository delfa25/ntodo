# Configuration GitHub Actions

## Aucun secret requis

Les workflows sont configurés pour :
- Tests automatiques
- Build local des images Docker
- Validation des manifestes Kubernetes

## Workflows disponibles

1. **ci-cd.yml** : Tests + déploiement automatique
2. **docker-build.yml** : Build manuel des images Docker

## Déclencheurs

- **Push** sur `main` ou `develop` : Tests + déploiement
- **Pull Request** sur `main` : Tests uniquement
- **Tags** `v*` : Build Docker
- **Manuel** : Build Docker