# 🚀 Instruções Finais - Push para GitHub

## ⚠️ Importante

Devido a limitações do ambiente com caracteres especiais no caminho, você precisa executar os comandos **manualmente** no PowerShell.

## 📋 Passo a Passo

### 1. Abra PowerShell

Abra o PowerShell do Windows (não o terminal integrado do Cursor).

### 2. Navegue até o projeto

```powershell
cd "c:\cursor\Falcão Coach"
```

### 3. Execute os comandos Git

Execute os comandos abaixo **na ordem**:

```powershell
# Inicializar Git (se ainda não inicializado)
git init
git branch -M main

# Adicionar todos os arquivos
git add .

# Criar commit inicial
git commit -m "feat: landing page inicial do Falcao Coach"

# Adicionar remote do GitHub
git remote add origin https://github.com/CarlosEduardoLago/falcao-coach-landing.git

# Fazer push
git push -u origin main
```

**Nota:** Se o remote já existir, use:
```powershell
git remote set-url origin https://github.com/CarlosEduardoLago/falcao-coach-landing.git
```

## 🔐 Autenticação

Quando o Git solicitar credenciais:

1. **Username:** `CarlosEduardoLago`
2. **Password:** Use um **Personal Access Token** (NÃO sua senha do GitHub)

### Como criar o token:

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Dê um nome: `Falcao Coach Landing`
4. Marque o escopo: **repo** (todas as opções de repo)
5. Clique em **"Generate token"**
6. **COPIE o token** (ele só aparece uma vez!)
7. Use o token como senha quando solicitado

## ✅ Após Push Bem-Sucedido

### 1. Configure GitHub Pages

1. Acesse: https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages
2. Em **"Source"**, selecione: **GitHub Actions**
3. Clique em **Save**

### 2. Acompanhe o Deploy

- Acesse: https://github.com/CarlosEduardoLago/falcao-coach-landing/actions
- Aguarde o workflow **"Build and Deploy"** completar (2-5 minutos)

### 3. Acesse o Site

Após o deploy completar, o site estará disponível em:

**https://CarlosEduardoLago.github.io/falcao-coach-landing**

## 📋 Scripts Alternativos

Se preferir usar scripts automatizados:

### Opção 1: Script Simplificado
```powershell
cd "c:\cursor\Falcão Coach"
.\PUBLICAR.ps1
```

### Opção 2: Script Completo
```powershell
cd "c:\cursor\Falcão Coach"
.\inicializar-e-push.ps1
```

## ❓ Troubleshooting

### Erro: "Authentication failed"
- Use Personal Access Token em vez de senha
- Verifique se o token tem permissões de `repo`

### Erro: "Repository not found"
- Verifique se o repositório existe no GitHub
- Verifique se o username está correto: `CarlosEduardoLago`

### Erro: "fatal: not a git repository"
- Execute `git init` primeiro

### Erro: "nothing to commit"
- Isso significa que já existe commit, pode fazer push direto

### Erro: "remote origin already exists"
- Use: `git remote set-url origin https://github.com/CarlosEduardoLago/falcao-coach-landing.git`

## 🔗 Links Úteis

- **Repositório:** https://github.com/CarlosEduardoLago/falcao-coach-landing
- **Actions:** https://github.com/CarlosEduardoLago/falcao-coach-landing/actions
- **Settings:** https://github.com/CarlosEduardoLago/falcao-coach-landing/settings
- **Pages:** https://github.com/CarlosEduardoLago/falcao-coach-landing/settings/pages
- **Criar Token:** https://github.com/settings/tokens

## ✨ Pronto!

Após seguir esses passos, sua landing page estará publicada no GitHub Pages!
