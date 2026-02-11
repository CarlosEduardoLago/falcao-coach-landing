# Script para verificar status do repositório GitHub
# Execute este script após fazer push

$ErrorActionPreference = "Continue"

Write-Host "=== Verificando Status do GitHub ===" -ForegroundColor Green

# Obter diretório atual do script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Verificar se Git está inicializado
if (-not (Test-Path ".git")) {
    Write-Host "Git não está inicializado!" -ForegroundColor Red
    exit 1
}

# Obter informações do remote
$remoteUrl = git remote get-url origin 2>&1
if ($remoteUrl -match "fatal" -or -not $remoteUrl) {
    Write-Host "Nenhum remote configurado!" -ForegroundColor Red
    Write-Host "Execute: .\conectar-github.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "`nRemote URL: $remoteUrl" -ForegroundColor Cyan

# Extrair username e repo do URL
if ($remoteUrl -match "github\.com[/:]([^/]+)/([^/]+)\.git") {
    $username = $matches[1]
    $repoName = $matches[2]
    
    Write-Host "Username: $username" -ForegroundColor Cyan
    Write-Host "Repositório: $repoName" -ForegroundColor Cyan
    
    # Verificar status local vs remoto
    Write-Host "`n=== Status Local vs Remoto ===" -ForegroundColor Green
    $status = git status -sb 2>&1
    Write-Host $status
    
    # Verificar último commit
    Write-Host "`n=== Último Commit ===" -ForegroundColor Green
    $lastCommit = git log --oneline -1 2>&1
    Write-Host $lastCommit
    
    # Verificar branches
    Write-Host "`n=== Branches ===" -ForegroundColor Green
    $branches = git branch -a 2>&1
    $branches | Select-Object -First 5 | Write-Host
    
    # Links úteis
    Write-Host "`n=== Links Úteis ===" -ForegroundColor Yellow
    Write-Host "Repositório: https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host "Actions: https://github.com/$username/$repoName/actions" -ForegroundColor Cyan
    Write-Host "Settings: https://github.com/$username/$repoName/settings" -ForegroundColor Cyan
    Write-Host "Pages: https://github.com/$username/$repoName/settings/pages" -ForegroundColor Cyan
    
    # Verificar se GitHub CLI está instalado para mais informações
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "`n=== Informações Adicionais (via GitHub CLI) ===" -ForegroundColor Green
        try {
            $repoInfo = gh repo view "$username/$repoName" --json nameWithOwner,isPrivate,defaultBranchRef,url 2>&1
            if ($repoInfo -notmatch "error") {
                Write-Host $repoInfo
            }
        } catch {
            Write-Host "Execute 'gh auth login' para usar GitHub CLI" -ForegroundColor Yellow
        }
    } else {
        Write-Host "`nDica: Instale GitHub CLI para mais funcionalidades:" -ForegroundColor Yellow
        Write-Host "  winget install GitHub.cli" -ForegroundColor Cyan
    }
    
    Write-Host "`n=== Próximos Passos ===" -ForegroundColor Yellow
    Write-Host "1. Verifique se o código está no GitHub: https://github.com/$username/$repoName" -ForegroundColor White
    Write-Host "2. Configure GitHub Pages em Settings > Pages" -ForegroundColor White
    Write-Host "3. Selecione source: GitHub Actions" -ForegroundColor White
    Write-Host "4. Aguarde o workflow de deploy completar" -ForegroundColor White
    Write-Host "5. Acesse: https://$username.github.io/$repoName" -ForegroundColor White
    
} else {
    Write-Host "Não foi possível extrair informações do remote URL" -ForegroundColor Yellow
    Write-Host "Remote URL: $remoteUrl" -ForegroundColor Cyan
}
