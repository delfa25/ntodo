@echo off

echo Installing NGINX Ingress Controller...
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

echo Building Docker images...
docker build -t ntodo-backend:latest ../backend
docker build -t ntodo-frontend:latest --build-arg REACT_APP_API_URL=http://localhost:30800/api ../frontend

echo Applying Kubernetes configurations...
kubectl apply -f namespace.yaml
kubectl apply -f mysql.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml

echo Waiting for MySQL to be ready...
kubectl wait --for=condition=ready pod -l app=mysql -n ntodo --timeout=300s

echo Waiting for backend to be ready...
kubectl wait --for=condition=ready pod -l app=backend -n ntodo --timeout=300s

echo Testing MySQL connection...
kubectl exec -n ntodo deployment/mysql -- mysqladmin ping -h localhost

echo Waiting 30 seconds for services to stabilize...
timeout /t 30 /nobreak

echo Running Laravel migrations...
kubectl exec -n ntodo deployment/backend -- php artisan migrate --force

echo Deployment complete!
echo Frontend: http://localhost:30300
echo Backend API: http://localhost:30800/api