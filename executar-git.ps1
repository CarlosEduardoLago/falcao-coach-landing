# Script para executar comandos Git
# Execute este script no diretório do projeto

$ErrorActionPreference = "Stop"

Write-Host "=== Executando comandos Git ===" -ForegroundColor Green

# Obter diretório atual do script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Cyan

# Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git não está instalado!" -ForegroundColor Red
    exit 1
}

# Remover locks se existirem
$lockFiles = @(".git\config.lock", ".git\index.lock", ".git\HEAD.lock")
foreach ($lockFile in $lockFiles) {
    if (Test-Path $lockFile) {
        Write-Host "Removendo lock file: $lockFile" -ForegroundColor Yellow
        Remove-Item $lockFile -Force -ErrorAction SilentlyContinue
    }
}

# Inicializar Git se não existir
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Cyan
    git init
    git branch -M main
    Write-Host "Git inicializado!" -ForegroundColor Green
} else {
    Write-Host "Repositório Git já existe." -ForegroundColor Yellow
}

# Verificar configuração
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "`nAVISO: Git não está configurado globalmente!" -ForegroundColor Yellow
    Write-Host "Configure com:" -ForegroundColor Yellow
    Write-Host '  git config --global user.name "Seu Nome"' -ForegroundColor Cyan
    Write-Host '  git config --global user.email "seu.email@example.com"' -ForegroundColor Cyan
} else {
    Write-Host "`nGit configurado:" -ForegroundColor Green
    Write-Host "  Nome: $userName" -ForegroundColor Cyan
    Write-Host "  Email: $userEmail" -ForegroundColor Cyan
}

# Adicionar arquivos
Write-Host "`n=== Adicionando arquivos ===" -ForegroundColor Green
git add .
Write-Host "Arquivos adicionados!" -ForegroundColor Green

# Verificar se há arquivos staged para commitar
$stagedFiles = git diff --cached --name-only 2>&1
if ($stagedFiles -and $stagedFiles -notmatch "fatal") {
    Write-Host "`n=== Arquivos prontos para commit ===" -ForegroundColor Green
    $stagedFiles | Select-Object -First 10 | Write-Host
} else {
    Write-Host "`nVerificando arquivos não rastreados..." -ForegroundColor Yellow
    $untrackedFiles = git ls-files --others --exclude-standard 2>&1
    if ($untrackedFiles -and $untrackedFiles.Count -gt 0) {
        Write-Host "Adicionando arquivos não rastreados..." -ForegroundColor Cyan
        git add .
    } else {
        Write-Host "Verificando status completo..." -ForegroundColor Yellow
        git status
    }
}

# Criar commit
Write-Host "`n=== Criando commit inicial ===" -ForegroundColor Green
$commitMessage = @"
feat: landing page inicial do Falcão Coach

- Setup completo com React, TypeScript, Vite e Tailwind CSS
- Seções: Hero, Sobre, Serviços, Calendário, Galeria e Contato
- Animações de scroll e efeitos visuais
- Calendário interativo com filtros
- Botão flutuante WhatsApp
- Design responsivo e moderno
"@

try {
    git commit -m $commitMessage 2>&1 | Out-String | Write-Host
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Commit criado com sucesso!" -ForegroundColor Green
        Write-Host "`n=== Próximos passos ===" -ForegroundColor Yellow
        Write-Host "1. Crie o repositório no GitHub: https://github.com/new" -ForegroundColor Cyan
        Write-Host "   Nome: falcao-coach-landing" -ForegroundColor White
        Write-Host "   NÃO marque nenhuma opção de inicialização" -ForegroundColor White
        Write-Host "`n2. Conecte ao GitHub (substitua SEU_USUARIO):" -ForegroundColor Cyan
        Write-Host '   git remote add origin https://github.com/SEU_USUARIO/falcao-coach-landing.git' -ForegroundColor White
        Write-Host "   git push -u origin main" -ForegroundColor White
    } else {
        Write-Host "`n⚠ Aviso: Não foi possível criar commit." -ForegroundColor Yellow
        Write-Host "Possíveis motivos:" -ForegroundColor Yellow
        Write-Host "- Não há arquivos para commitar" -ForegroundColor White
        Write-Host "- Git não está configurado (nome/email)" -ForegroundColor White
        Write-Host "- Já existe um commit" -ForegroundColor White
        Write-Host "`nExecute 'git status' para ver o estado atual." -ForegroundColor Cyan
    }
} catch {
    Write-Host "`nErro ao criar commit: $_" -ForegroundColor Red
    Write-Host "Execute 'git status' para diagnosticar o problema." -ForegroundColor Yellow
}
