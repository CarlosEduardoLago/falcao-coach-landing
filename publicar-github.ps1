# Script para publicar no GitHub
# Execute este script no diretório do projeto

$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PUBLICAR NO GITHUB - FALCÃO COACH" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Usar diretório atual (workspace)
$currentDir = Get-Location
Write-Host "Diretório atual: $currentDir" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Git não está instalado!" -ForegroundColor Red
    Write-Host "Instale Git em: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

Write-Host "=== Passo 1: Verificando Git ===" -ForegroundColor Yellow

# Verificar se é repositório Git
$isGitRepo = Test-Path ".git"
if (-not $isGitRepo) {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Cyan
    git init
    git branch -M main
    Write-Host "✓ Git inicializado" -ForegroundColor Green
} else {
    Write-Host "✓ Git já inicializado" -ForegroundColor Green
}

# Verificar configuração Git
$userName = git config --global user.name
$userEmail = git config --global user.email
if (-not $userName -or -not $userEmail) {
    Write-Host ""
    Write-Host "AVISO: Git não está configurado globalmente!" -ForegroundColor Yellow
    Write-Host "Configure com:" -ForegroundColor Yellow
    Write-Host '  git config --global user.name "Seu Nome"' -ForegroundColor Cyan
    Write-Host '  git config --global user.email "seu.email@example.com"' -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Continuando mesmo assim..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Passo 2: Adicionando Arquivos ===" -ForegroundColor Yellow

# Adicionar todos os arquivos
git add . 2>&1 | Out-Null
$status = git status --short
if ($status) {
    Write-Host "✓ Arquivos adicionados ao staging" -ForegroundColor Green
} else {
    Write-Host "✓ Nenhuma alteração pendente" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Passo 3: Criando Commit ===" -ForegroundColor Yellow

# Verificar se já existe commit
$lastCommit = git log --oneline -1 2>&1
if ($lastCommit -match "fatal") {
    # Criar commit inicial
    $commitMessage = @"
feat: landing page inicial do Falcão Coach

- Setup completo com React, TypeScript, Vite e Tailwind CSS
- Seções: Hero, Sobre, Serviços, Calendário, Galeria e Contato
- Animações de scroll e efeitos visuais
- Calendário interativo com filtros
- Botão flutuante WhatsApp
- Design responsivo e moderno
- Configuração para GitHub Pages
- Workflows CI/CD configurados
"@
    
    $commitResult = git commit -m $commitMessage 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Commit inicial criado" -ForegroundColor Green
    } else {
        if ($commitResult -match "nothing to commit") {
            Write-Host "✓ Nada para commitar (já existe commit)" -ForegroundColor Yellow
        } else {
            Write-Host "⚠ Erro ao criar commit" -ForegroundColor Red
        }
    }
} else {
    Write-Host "✓ Commit já existe: $lastCommit" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Passo 4: Configurando Remote ===" -ForegroundColor Yellow

$repoUrl = "https://github.com/CarlosEduardoLago/falcao-coach-landing.git"

# Verificar remote existente
$existingRemote = git remote get-url origin 2>&1
if ($existingRemote -and $existingRemote -notmatch "fatal") {
    Write-Host "Remote existente: $existingRemote" -ForegroundColor Cyan
    if ($existingRemote -ne $repoUrl) {
        git remote set-url origin $repoUrl 2>&1 | Out-Null
        Write-Host "✓ Remote atualizado para: $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "✓ Remote já está configurado corretamente" -ForegroundColor Green
    }
} else {
    git remote add origin $repoUrl 2>&1 | Out-Null
    Write-Host "✓ Remote adicionado: $repoUrl" -ForegroundColor Green
}

# Verificar remote
$verifyRemote = git remote get-url origin 2>&1
Write-Host "Remote configurado: $verifyRemote" -ForegroundColor Cyan

Write-Host ""
Write-Host "=== Passo 5: Garantindo Branch Main ===" -ForegroundColor Yellow
$currentBranch = git branch --show-current
Write-Host "Branch atual: $currentBranch" -ForegroundColor Cyan
if ($currentBranch -ne "main") {
    git branch -M main 2>&1 | Out-Null
    Write-Host "✓ Branch renomeada para main" -ForegroundColor Green
} else {
    Write-Host "✓ Já está na branch main" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Passo 6: Fazendo Push para GitHub ===" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠ ATENÇÃO: Isso pode solicitar autenticação!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Se solicitar credenciais:" -ForegroundColor White
Write-Host "  Username: CarlosEduardoLago" -ForegroundColor Cyan
Write-Host "  Password: Use Personal Access Token (NÃO sua senha)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Criar token: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "  - Escopo: repo (todas as opções)" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Enter para continuar ou Ctrl+C para cancelar..." -ForegroundColor Yellow
$null = Read-Host

Write-Host ""
Write-Host "Executando: git push -u origin main" -ForegroundColor Cyan
Write-Host ""

# Fazer push
$pushOutput = git push -u origin main 2>&1

$pushSuccess = $false
foreach ($line in $pushOutput) {
    if ($line -match "error|fatal|denied|rejected|Authentication failed|Permission denied") {
        Write-Host $line -ForegroundColor Red
    } elseif ($line -match "success|done|pushed|up to date|remote:|Enumerating|Counting|Compressing|Writing") {
        Write-Host $line -ForegroundColor Green
        if ($line -match "pushed|up to date") {
            $pushSuccess = $true
        }
    } else {
        Write-Host $line
    }
}

Write-Host ""

if ($LASTEXITCODE -eq 0 -or $pushSuccess) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓✓✓ PUSH REALIZADO COM SUCESSO! ✓✓✓" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== Links Importantes ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Repositório:" -ForegroundColor Cyan
    Write-Host "  https://github.com/CarlosEduardoLago/falcao-coach-landing" -ForegroundColor White
    Write-Host ""
    Write-Host "Actions (acompanhar deploy):" -ForegroundColor Cyan
    Write-Host "  https://github.com/CarlosEduardoLago/falcao-coach-landing/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "Configurar GitHub Pages:" -ForegroundColor Cyan
    Write-Host "  https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages" -ForegroundColor White
    Write-Host ""
    Write-Host "=== Próximos Passos ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Configure GitHub Pages:" -ForegroundColor White
    Write-Host "   - Acesse o link acima" -ForegroundColor Gray
    Write-Host "   - Em 'Source', selecione: GitHub Actions" -ForegroundColor Gray
    Write-Host "   - Clique em Save" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Acompanhe o deploy:" -ForegroundColor White
    Write-Host "   - Vá em Actions no repositório" -ForegroundColor Gray
    Write-Host "   - Aguarde o workflow 'Build and Deploy' completar" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Acesse o site:" -ForegroundColor White
    Write-Host "   https://CarlosEduardoLago.github.io/falcao-coach-landing" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ⚠ ERRO AO FAZER PUSH" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis soluções:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Autenticação:" -ForegroundColor White
    Write-Host "   - Crie Personal Access Token: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host "   - Use o token como senha (não sua senha do GitHub)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. SSH (alternativa):" -ForegroundColor White
    Write-Host "   git remote set-url origin git@github.com:CarlosEduardoLago/falcao-coach-landing.git" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3. GitHub CLI:" -ForegroundColor White
    Write-Host "   gh auth login" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
}
