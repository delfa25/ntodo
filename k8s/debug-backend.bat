@echo off

echo Checking backend logs...
kubectl logs -n ntodo deployment/backend --tail=50

echo.
echo Checking backend pod details...
kubectl describe pod -n ntodo -l app=backend

echo.
echo Testing MySQL connection from backend...
kubectl exec -n ntodo deployment/backend -- php artisan tinker --execute="DB::connection()->getPdo(); echo 'MySQL connection OK';" 2>nul || echo "MySQL connection failed"