@echo off
echo Demarrage de l'application de gestion de contacts...

REM Arreter les conteneurs existants
echo Arret des conteneurs existants...
docker-compose down

REM Construire et demarrer les services
echo Construction et demarrage des services...
docker-compose up --build -d

REM Attendre que les services soient prets
echo Attente du demarrage des services...
timeout /t 45 /nobreak

REM Verifier le statut des conteneurs
echo Verification du statut des conteneurs...
docker-compose ps

REM Verifier que le backend est pret
echo Verification que le backend est pret...
docker-compose logs backend --tail=5

echo.
echo Application demarree avec succes!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000/api
echo Base de donnees: localhost:3306
echo.
echo Pour voir les logs: docker-compose logs -f
echo Pour arreter: docker-compose down
pause