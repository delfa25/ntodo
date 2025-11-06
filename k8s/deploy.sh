#!/bin/bash

echo "Building Docker images..."
docker build -t ntodo-backend:latest ./backend
docker build -t ntodo-frontend:latest --build-arg REACT_APP_API_URL=http://localhost:30800/api ./frontend

echo "Applying Kubernetes configurations..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mysql.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml

echo "Waiting for MySQL to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n ntodo --timeout=300s

echo "Running Laravel migrations..."
kubectl exec -n ntodo deployment/backend -- php artisan migrate --force

echo "Deployment complete!"
echo "Frontend: http://localhost:30300"
echo "Backend: http://localhost:30800"