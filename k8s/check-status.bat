@echo off

echo Checking deployment status...
kubectl get pods -n ntodo
echo.

echo Checking services...
kubectl get services -n ntodo
echo.

echo Checking ingress...
kubectl get ingress -n ntodo
echo.

echo Testing frontend access...
curl -I http://localhost:30300 2>nul || echo "Frontend not accessible yet"

echo Testing backend API...
curl -I http://localhost:30800/api 2>nul || echo "Backend API not accessible yet"