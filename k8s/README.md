# Déploiement Kubernetes pour ntodo

## Prérequis
- Docker Desktop avec Kubernetes activé
- kubectl configuré

## Déploiement rapide

### Windows
```bash
cd k8s
deploy.bat
```

### Linux/Mac
```bash
cd k8s
chmod +x deploy.sh
./deploy.sh
```

## Accès à l'application
- **Frontend**: http://localhost:30300
- **Backend API**: http://localhost:30800

## Nettoyage
```bash
cleanup.bat  # Windows
```

## Architecture
- **MySQL**: Base de données avec stockage persistant
- **Backend**: API Laravel exposée sur le port 30800
- **Frontend**: Application React exposée sur le port 30300

## Vérification du déploiement
```bash
kubectl get pods -n ntodo
kubectl get services -n ntodo
```