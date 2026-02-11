@echo off
chcp 65001 >nul
cd /d "c:\cursor\FALCOC~1"

echo === PUBLICANDO NO GITHUB ===
echo.

echo === Configurando Git ===
git config user.name "CarlosEduardoLago"
git config user.email "carloseduardolago@users.noreply.github.com"
echo Git configurado!

echo.
echo === Adicionando Arquivos ===
git add .

echo.
echo === Criando Commit ===
git commit -m "feat: landing page profissional Falcao Coach"

echo.
echo === Configurando Remote ===
git remote remove origin 2>nul
git remote add origin https://github.com/CarlosEduardoLago/falcao-coach-landing.git
git branch -M main

echo.
echo === Push para GitHub ===
git push -u origin main
