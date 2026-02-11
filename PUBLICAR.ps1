# Script simplificado para publicar no GitHub
$ErrorActionPreference = "Continue"

Write-Host "=== PUBLICAR NO GITHUB ===" -ForegroundColor Green
Write-Host ""

# 1. Git init
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando Git..." -ForegroundColor Cyan
    git init
    git branch -M main
}

# 2. Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Cyan
git add . 2>&1 | Out-Null

# 3. Commit
$hasCommit = git log --oneline -1 2>&1
if ($hasCommit -match "fatal") {
    Write-Host "Criando commit inicial..." -ForegroundColor Cyan
    git commit -m "feat: landing page inicial do Falcao Coach" 2>&1 | Out-Null
}

# 4. Remote
$repoUrl = "https://github.com/CarlosEduardoLago/falcao-coach-landing.git"
$existing = git remote get-url origin 2>&1
if ($existing -match "fatal") {
    git remote add origin $repoUrl 2>&1 | Out-Null
} else {
    git remote set-url origin $repoUrl 2>&1 | Out-Null
}

# 5. Push
Write-Host ""
Write-Host "Fazendo push..." -ForegroundColor Yellow
Write-Host "Use Personal Access Token como senha:" -ForegroundColor White
Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== SUCESSO! ===" -ForegroundColor Green
    Write-Host "Repositorio: https://github.com/CarlosEduardoLago/falcao-coach-landing" -ForegroundColor Cyan
    Write-Host "Pages: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages" -ForegroundColor Cyan
    Write-Host "Site: https://CarlosEduardoLago.github.io/falcao-coach-landing" -ForegroundColor Green
}
