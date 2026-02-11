# Script completo: inicializa Git, cria commit e faz push
$ErrorActionPreference = "Continue"

Write-Host "=== Inicialização Completa e Push ===" -ForegroundColor Green
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptDir

Write-Host "Diretório: $scriptDir" -ForegroundColor Cyan

# 1. Verificar/Inicializar Git
Write-Host "`n=== Passo 1: Git ===" -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando Git..." -ForegroundColor Cyan
    git init
    git branch -M main
    Write-Host "Git inicializado!" -ForegroundColor Green
} else {
    Write-Host "Git já inicializado" -ForegroundColor Green
}

# 2. Verificar configuração
$userName = git config --global user.name
$userEmail = git config --global user.email
if (-not $userName -or -not $userEmail) {
    Write-Host "AVISO: Configure Git:" -ForegroundColor Yellow
    Write-Host '  git config --global user.name "Seu Nome"' -ForegroundColor Cyan
    Write-Host '  git config --global user.email "seu.email@example.com"' -ForegroundColor Cyan
}

# 3. Adicionar arquivos
Write-Host "`n=== Passo 2: Adicionar Arquivos ===" -ForegroundColor Yellow
git add . 2>&1 | Out-Null
$status = git status --short
if ($status) {
    Write-Host "Arquivos adicionados!" -ForegroundColor Green
} else {
    Write-Host "Nenhuma alteração para adicionar" -ForegroundColor Yellow
}

# 4. Criar commit
Write-Host "`n=== Passo 3: Criar Commit ===" -ForegroundColor Yellow
$commitMsg = @"
feat: landing page inicial do Falcão Coach

- Setup completo com React, TypeScript, Vite e Tailwind CSS
- Seções: Hero, Sobre, Serviços, Calendário, Galeria e Contato
- Animações de scroll e efeitos visuais
- Calendário interativo com filtros
- Botão flutuante WhatsApp
- Design responsivo e moderno
- Configuração para GitHub Pages
"@

$commit = git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Commit criado!" -ForegroundColor Green
} else {
    if ($commit -match "nothing to commit") {
        Write-Host "Já existe commit" -ForegroundColor Yellow
    } else {
        Write-Host "Erro ao criar commit: $commit" -ForegroundColor Red
        Pop-Location
        exit 1
    }
}

# 5. Configurar remote
Write-Host "`n=== Passo 4: Configurar Remote ===" -ForegroundColor Yellow
$repoUrl = "https://github.com/CarlosEduardoLago/falcao-coach-landing.git"

$existing = git remote get-url origin 2>&1
if ($existing -and $existing -notmatch "fatal") {
    Write-Host "Remote existente: $existing" -ForegroundColor Cyan
    git remote set-url origin $repoUrl 2>&1 | Out-Null
} else {
    git remote add origin $repoUrl 2>&1 | Out-Null
}
Write-Host "Remote configurado: $repoUrl" -ForegroundColor Green

# 6. Push
Write-Host "`n=== Passo 5: Push para GitHub ===" -ForegroundColor Yellow
Write-Host "Isso pode solicitar autenticação." -ForegroundColor White
Write-Host "Use Personal Access Token como senha:" -ForegroundColor White
Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

$output = git push -u origin main 2>&1

$success = $false
foreach ($line in $output) {
    if ($line -match "error|fatal|denied|rejected|Authentication failed") {
        Write-Host $line -ForegroundColor Red
    } elseif ($line -match "success|done|pushed|up to date|remote:") {
        Write-Host $line -ForegroundColor Green
        if ($line -match "pushed|up to date") {
            $success = $true
        }
    } else {
        Write-Host $line
    }
}

if ($LASTEXITCODE -eq 0 -or $success) {
    Write-Host ""
    Write-Host "=== SUCESSO! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repositório: https://github.com/CarlosEduardoLago/falcao-coach-landing" -ForegroundColor Cyan
    Write-Host "Actions: https://github.com/CarlosEduardoLago/falcao-coach-landing/actions" -ForegroundColor Cyan
    Write-Host "Pages: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Yellow
    Write-Host "1. Configure GitHub Pages (Source: GitHub Actions)" -ForegroundColor White
    Write-Host "2. Acompanhe deploy em Actions" -ForegroundColor White
    Write-Host "3. Site: https://CarlosEduardoLago.github.io/falcao-coach-landing" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=== ERRO NO PUSH ===" -ForegroundColor Red
    Write-Host ""
    Write-Host "Soluções:" -ForegroundColor Yellow
    Write-Host "1. Crie token: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Permissões: repo (todas)" -ForegroundColor White
    Write-Host "3. Use o token como senha (não sua senha)" -ForegroundColor White
    Write-Host ""
    Write-Host "Ou configure SSH:" -ForegroundColor Yellow
    Write-Host "  git remote set-url origin git@github.com:CarlosEduardoLago/falcao-coach-landing.git" -ForegroundColor Cyan
}

Pop-Location
