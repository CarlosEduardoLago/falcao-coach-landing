@echo off
chcp 65001 >nul
echo === Configurando Repositório Git ===
echo.

REM Verificar se Git está instalado
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo Git não está instalado. Por favor, instale o Git primeiro.
    pause
    exit /b 1
)

REM Verificar se já existe repositório Git
if exist ".git" (
    echo Repositório Git já existe.
    git status
) else (
    echo Inicializando repositório Git...
    git init
    git branch -M main
    echo Repositório Git inicializado!
)

echo.
echo === Verificando configuração do Git ===
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Git não está configurado. Configure com:
    echo git config --global user.name "Seu Nome"
    echo git config --global user.email "seu.email@example.com"
) else (
    echo Git configurado:
    git config --global user.name
    git config --global user.email
)

echo.
echo === Adicionando arquivos ao stage ===
git add .
echo Arquivos adicionados!

echo.
echo === Status do repositório ===
git status

echo.
echo === Próximos passos ===
echo 1. Crie o commit inicial com:
echo    git commit -m "feat: landing page inicial do Falcão Coach"
echo.
echo 2. Crie o repositório no GitHub:
echo    - Acesse: https://github.com/new
echo    - Nome: falcao-coach-landing
echo    - NÃO marque 'Initialize with README'
echo.
echo 3. Conecte ao GitHub:
echo    git remote add origin https://github.com/SEU_USUARIO/falcao-coach-landing.git
echo    git push -u origin main
echo.
pause
