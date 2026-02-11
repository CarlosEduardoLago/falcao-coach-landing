# Script para conectar ao GitHub e fazer push
# Execute este script no diretório do projeto
# Uso: .\conectar-github.ps1 [-Username "seu-username"]

param(
    [string]$Username = "CarlosEduardoLago"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Conectando ao GitHub ===" -ForegroundColor Green

# Obter diretório atual do script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Cyan

# Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git não está instalado!" -ForegroundColor Red
    exit 1
}

# Verificar se Git está inicializado
if (-not (Test-Path ".git")) {
    Write-Host "Git não está inicializado. Execute primeiro: .\executar-git.ps1" -ForegroundColor Red
    exit 1
}

# Verificar se há commits
$hasCommits = git log --oneline -1 2>&1
if (-not $hasCommits -or $hasCommits -match "fatal") {
    Write-Host "Nenhum commit encontrado. Execute primeiro: .\executar-git.ps1" -ForegroundColor Red
    exit 1
}

Write-Host "`nÚltimo commit: $hasCommits" -ForegroundColor Cyan

# Configuração do GitHub
Write-Host "`n=== Configuração do GitHub ===" -ForegroundColor Green

# Verificar variável de ambiente ou usar o padrão
if (-not $Username -or $Username -eq "") {
    $Username = $env:GITHUB_USERNAME
    if (-not $Username) {
        $Username = "CarlosEduardoLago"
    }
}

$repoUrl = "https://github.com/$Username/falcao-coach-landing.git"
Write-Host "Username: $Username" -ForegroundColor Cyan
Write-Host "Repositório: $repoUrl" -ForegroundColor Cyan

# Verificar se remote já existe
$existingRemote = git remote get-url origin 2>&1
if ($existingRemote -and $existingRemote -notmatch "fatal") {
    Write-Host "`nRemote já existe: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "Deseja atualizar para $repoUrl? (S/N)"
    if ($update -eq "S" -or $update -eq "s" -or $update -eq "Y" -or $update -eq "y") {
        git remote set-url origin $repoUrl
        Write-Host "Remote atualizado!" -ForegroundColor Green
    } else {
        Write-Host "Mantendo remote existente." -ForegroundColor Yellow
        $repoUrl = $existingRemote
    }
} else {
    Write-Host "`nAdicionando remote origin..." -ForegroundColor Cyan
    git remote add origin $repoUrl
    Write-Host "Remote adicionado!" -ForegroundColor Green
}

# Garantir que está na branch main
Write-Host "`n=== Verificando branch ===" -ForegroundColor Green
$currentBranch = git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan

if ($currentBranch -ne "main") {
    Write-Host "Renomeando branch para main..." -ForegroundColor Yellow
    git branch -M main
}

# Verificar status antes do push
Write-Host "`n=== Status antes do push ===" -ForegroundColor Green
git status --short | Select-Object -First 10

# Fazer push
Write-Host "`n=== Fazendo push para GitHub ===" -ForegroundColor Green
Write-Host "Isso pode solicitar autenticação..." -ForegroundColor Yellow
Write-Host "Se usar HTTPS, você precisará de um Personal Access Token" -ForegroundColor Yellow
Write-Host "Crie em: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

try {
    git push -u origin main 2>&1 | ForEach-Object {
        Write-Host $_ -ForegroundColor $(if ($_ -match "error|fatal") { "Red" } else { "White" })
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Push realizado com sucesso!" -ForegroundColor Green
        Write-Host "`n=== Links Úteis ===" -ForegroundColor Yellow
        Write-Host "Repositório: https://github.com/$Username/falcao-coach-landing" -ForegroundColor Cyan
        Write-Host "Actions: https://github.com/$Username/falcao-coach-landing/actions" -ForegroundColor Cyan
        Write-Host "Settings: https://github.com/$Username/falcao-coach-landing/settings" -ForegroundColor Cyan
        Write-Host "Pages: https://github.com/$Username/falcao-coach-landing/settings/pages" -ForegroundColor Cyan
        Write-Host "`nSite será publicado em:" -ForegroundColor Yellow
        Write-Host "https://$Username.github.io/falcao-coach-landing" -ForegroundColor Green
        Write-Host "`nPróximos passos:" -ForegroundColor Yellow
        Write-Host "1. Configure GitHub Pages em Settings > Pages" -ForegroundColor White
        Write-Host "2. Selecione source: GitHub Actions" -ForegroundColor White
        Write-Host "3. O site estará disponível em alguns minutos" -ForegroundColor White
    } else {
        Write-Host "`n⚠ Erro ao fazer push." -ForegroundColor Red
        Write-Host "Possíveis causas:" -ForegroundColor Yellow
        Write-Host "- Problemas de autenticação (use token ou SSH)" -ForegroundColor White
        Write-Host "- Repositório não existe ou não tem permissão" -ForegroundColor White
        Write-Host "- Conflitos com conteúdo remoto" -ForegroundColor White
        Write-Host "`nTente novamente ou configure autenticação:" -ForegroundColor Cyan
        Write-Host "  - Token: https://github.com/settings/tokens" -ForegroundColor White
        Write-Host "  - SSH: git remote set-url origin git@github.com:$Username/falcao-coach-landing.git" -ForegroundColor White
    }
} catch {
    Write-Host "`nErro: $_" -ForegroundColor Red
}
