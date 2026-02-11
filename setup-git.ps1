# Script para configurar Git e GitHub
# Execute este script no diretório do projeto

Write-Host "=== Configurando Repositório Git ===" -ForegroundColor Green

# Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git não está instalado. Por favor, instale o Git primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se já existe repositório Git
if (Test-Path ".git") {
    Write-Host "Repositório Git já existe." -ForegroundColor Yellow
    git status
} else {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Cyan
    git init
    git branch -M main
    Write-Host "Repositório Git inicializado!" -ForegroundColor Green
}

# Verificar configuração do Git
Write-Host "`n=== Verificando configuração do Git ===" -ForegroundColor Green
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "Git não está configurado. Configure com:" -ForegroundColor Yellow
    Write-Host "git config --global user.name 'Seu Nome'" -ForegroundColor Cyan
    Write-Host "git config --global user.email 'seu.email@example.com'" -ForegroundColor Cyan
} else {
    Write-Host "Git configurado:" -ForegroundColor Green
    Write-Host "  Nome: $userName" -ForegroundColor Cyan
    Write-Host "  Email: $userEmail" -ForegroundColor Cyan
}

# Adicionar arquivos
Write-Host "`n=== Adicionando arquivos ao stage ===" -ForegroundColor Green
git add .
Write-Host "Arquivos adicionados!" -ForegroundColor Green

# Mostrar status
Write-Host "`n=== Status do repositório ===" -ForegroundColor Green
git status

Write-Host "`n=== Próximos passos ===" -ForegroundColor Yellow
Write-Host "1. Crie o commit inicial com:" -ForegroundColor Cyan
Write-Host '   git commit -m "feat: landing page inicial do Falcão Coach"' -ForegroundColor White
Write-Host "`n2. Crie o repositório no GitHub:" -ForegroundColor Cyan
Write-Host "   - Acesse: https://github.com/new" -ForegroundColor White
Write-Host "   - Nome: falcao-coach-landing" -ForegroundColor White
Write-Host "   - NÃO marque 'Initialize with README'" -ForegroundColor White
Write-Host "`n3. Conecte ao GitHub:" -ForegroundColor Cyan
Write-Host '   git remote add origin https://github.com/SEU_USUARIO/falcao-coach-landing.git' -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
