@echo off
chcp 65001 >nul
cd /d "c:\cursor\FALCOC~1"
git add src/components/Header.tsx
git commit -m "fix: ajusta menu mobile removendo botao WhatsApp"
git push origin main
echo.
echo Done!
