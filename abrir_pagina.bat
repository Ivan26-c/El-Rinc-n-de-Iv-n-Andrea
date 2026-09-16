@echo off
title Nuestra Historia - Ivan & Andrea
cd /d "%~dp0"

echo ====================================================
echo        NUESTRA HISTORIA - IVAN & ANDREA
echo ====================================================
echo Abriendo en tu navegador...

powershell -Command "Start-Process 'http://localhost:8080'" 2>nul

rem Si no habia servidor corriendo, iniciar server.js en segundo plano
netstat -ano | findstr :8080 >nul 2>nul
if %errorlevel% neq 0 (
    where node >nul 2>nul
    if %errorlevel% equ 0 (
        start /b "" node server.js
        timeout /t 1 /nobreak >nul
        powershell -Command "Start-Process 'http://localhost:8080'"
    ) else (
        start "" "index.html"
    )
)

echo Listo! Puedes cerrar esta ventana.
exit
