# Script simplificado para push inicial
# Execute este script no diretório do projeto

$ErrorActionPreference = "Continue"

Write-Host "=== Push Inicial para GitHub ===" -ForegroundColor Green
Write-Host ""

# Obter diretório do script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptDir

Write-Host "Diretório: $scriptDir" -ForegroundColor Cyan

# Verificar Git
if (-not (Test-Path ".git")) {
    Write-Host "ERRO: Git não inicializado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\executar-git.ps1" -ForegroundColor Yellow
    Pop-Location
    exit 1
}

# Verificar commits
$commit = git log --oneline -1 2>&1
if ($commit -match "fatal") {
    Write-Host "ERRO: Nenhum commit encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\executar-git.ps1" -ForegroundColor Yellow
    Pop-Location
    exit 1
}

Write-Host "Último commit: $commit" -ForegroundColor Green

# Configurar remote
$repoUrl = "https://github.com/CarlosEduardoLago/falcao-coach-landing.git"
Write-Host ""
Write-Host "=== Configurando Remote ===" -ForegroundColor Yellow

$existing = git remote get-url origin 2>&1
if ($existing -and $existing -notmatch "fatal") {
    Write-Host "Remote existente: $existing" -ForegroundColor Cyan
    git remote set-url origin $repoUrl
    Write-Host "Remote atualizado!" -ForegroundColor Green
} else {
    git remote add origin $repoUrl 2>&1 | Out-Null
    Write-Host "Remote adicionado!" -ForegroundColor Green
}

# Verificar remote
$verify = git remote get-url origin 2>&1
Write-Host "Remote configurado: $verify" -ForegroundColor Cyan

# Branch main
git branch -M main 2>&1 | Out-Null

# Push
Write-Host ""
Write-Host "=== Fazendo Push ===" -ForegroundColor Yellow
Write-Host "Isso pode solicitar autenticação." -ForegroundColor White
Write-Host "Use Personal Access Token como senha:" -ForegroundColor White
Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

$output = git push -u origin main 2>&1

foreach ($line in $output) {
    if ($line -match "error|fatal|denied|rejected") {
        Write-Host $line -ForegroundColor Red
    } elseif ($line -match "success|done|pushed|up to date") {
        Write-Host $line -ForegroundColor Green
    } else {
        Write-Host $line
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== SUCESSO! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repositório: https://github.com/CarlosEduardoLago/falcao-coach-landing" -ForegroundColor Cyan
    Write-Host "Pages: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Próximo passo:" -ForegroundColor Yellow
    Write-Host "1. Configure GitHub Pages (Source: GitHub Actions)" -ForegroundColor White
    Write-Host "2. Site: https://CarlosEduardoLago.github.io/falcao-coach-landing" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=== ERRO NO PUSH ===" -ForegroundColor Red
    Write-Host ""
    Write-Host "Soluções:" -ForegroundColor Yellow
    Write-Host "1. Crie token: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Use o token como senha" -ForegroundColor White
    Write-Host "3. Ou configure SSH" -ForegroundColor White
}

Pop-Location
