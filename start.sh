#!/bin/bash

echo "Démarrage de l'application de gestion de contacts..."

# Arrêter les conteneurs existants
echo "Arrêt des conteneurs existants..."
docker-compose down

# Construire et démarrer les services
echo "Construction et démarrage des services..."
docker-compose up --build -d

# Attendre que les services soient prêts
echo "Attente du démarrage des services..."
sleep 30

# Vérifier le statut des conteneurs
echo "Vérification du statut des conteneurs..."
docker-compose ps

echo ""
echo "Application démarrée avec succès!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8000/api"
echo "Base de données: localhost:3306"
echo ""
echo "Pour voir les logs: docker-compose logs -f"
echo "Pour arrêter: docker-compose down"