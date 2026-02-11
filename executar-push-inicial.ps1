# Script para executar push inicial ao GitHub
$ErrorActionPreference = "Stop"

Write-Host "=== Push Inicial para GitHub ===" -ForegroundColor Green

# Obter diretório atual do script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Diretório: $(Get-Location)" -ForegroundColor Cyan

# Verificar Git
if (-not (Test-Path ".git")) {
    Write-Host "Git não inicializado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\executar-git.ps1" -ForegroundColor Yellow
    exit 1
}

# Verificar commits
$lastCommit = git log --oneline -1 2>&1
if (-not $lastCommit -or $lastCommit -match "fatal") {
    Write-Host "Nenhum commit encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\executar-git.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "Último commit: $lastCommit" -ForegroundColor Cyan

# Configurar remote
Write-Host "`n=== Configurando Remote ===" -ForegroundColor Green
$repoUrl = "https://github.com/CarlosEduardoLago/falcao-coach-landing.git"

$existing = git remote get-url origin 2>&1
if ($existing -and $existing -notmatch "fatal") {
    Write-Host "Remote existente: $existing" -ForegroundColor Yellow
    git remote set-url origin $repoUrl
    Write-Host "Remote atualizado!" -ForegroundColor Green
} else {
    Write-Host "Adicionando remote..." -ForegroundColor Cyan
    git remote add origin $repoUrl
    Write-Host "Remote adicionado!" -ForegroundColor Green
}

# Verificar remote
$verifyRemote = git remote get-url origin 2>&1
Write-Host "Remote configurado: $verifyRemote" -ForegroundColor Green

# Garantir branch main
Write-Host "`n=== Verificando Branch ===" -ForegroundColor Green
$currentBranch = git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan

if ($currentBranch -ne "main") {
    Write-Host "Renomeando para main..." -ForegroundColor Yellow
    git branch -M main
}

# Status
Write-Host "`n=== Status ===" -ForegroundColor Green
git status --short | Select-Object -First 10

# Push
Write-Host "`n=== Fazendo Push ===" -ForegroundColor Green
Write-Host "Isso pode solicitar autenticação." -ForegroundColor Yellow
Write-Host "Se usar HTTPS, você precisará de um Personal Access Token." -ForegroundColor Yellow
Write-Host "Crie em: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

try {
    $pushOutput = git push -u origin main 2>&1
    
    foreach ($line in $pushOutput) {
        $color = if ($line -match "error|fatal|denied|rejected") { "Red" } 
                 elseif ($line -match "success|done|pushed|up to date") { "Green" }
                 else { "White" }
        Write-Host $line -ForegroundColor $color
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓✓✓ PUSH REALIZADO COM SUCESSO! ✓✓✓" -ForegroundColor Green
        Write-Host "`n=== Links Importantes ===" -ForegroundColor Yellow
        Write-Host "Repositório: https://github.com/CarlosEduardoLago/falcao-coach-landing" -ForegroundColor Cyan
        Write-Host "Actions: https://github.com/CarlosEduardoLago/falcao-coach-landing/actions" -ForegroundColor Cyan
        Write-Host "Settings: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings" -ForegroundColor Cyan
        Write-Host "Pages: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages" -ForegroundColor Cyan
        Write-Host "`n=== Próximos Passos ===" -ForegroundColor Yellow
        Write-Host "1. Acesse: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages" -ForegroundColor White
        Write-Host "2. Em 'Source', selecione: GitHub Actions" -ForegroundColor White
        Write-Host "3. Clique em Save" -ForegroundColor White
        Write-Host "4. Aguarde o workflow de deploy completar" -ForegroundColor White
        Write-Host "5. Acesse: https://CarlosEduardoLago.github.io/falcao-coach-landing" -ForegroundColor Green
    } else {
        Write-Host "`n⚠ Erro ao fazer push." -ForegroundColor Red
        Write-Host "`nPossíveis soluções:" -ForegroundColor Yellow
        Write-Host "1. Use Personal Access Token (não senha)" -ForegroundColor White
        Write-Host "   https://github.com/settings/tokens" -ForegroundColor Cyan
        Write-Host "2. Ou configure SSH:" -ForegroundColor White
        Write-Host "   git remote set-url origin git@github.com:CarlosEduardoLago/falcao-coach-landing.git" -ForegroundColor Cyan
        Write-Host "3. Ou use GitHub CLI:" -ForegroundColor White
        Write-Host "   gh auth login" -ForegroundColor Cyan
    }
} catch {
    Write-Host "`nErro: $_" -ForegroundColor Red
}
