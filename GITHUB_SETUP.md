# Guia de Configuração do GitHub

Este guia contém instruções passo a passo para publicar este projeto no GitHub.

## Pré-requisitos

- Git instalado ([Download](https://git-scm.com/downloads))
- Conta no GitHub ([Criar conta](https://github.com/signup))
- Node.js e npm instalados (já configurados no projeto)

## Passo 1: Configurar Git Localmente

### Windows (PowerShell)

Execute o script fornecido:

```powershell
.\setup-git.ps1
```

Ou execute manualmente:

```powershell
# Navegar até o diretório do projeto
cd "c:\cursor\Falcão Coach"

# Inicializar Git
git init
git branch -M main

# Configurar Git (se ainda não configurado)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"

# Adicionar arquivos
git add .

# Criar commit inicial
git commit -m "feat: landing page inicial do Falcão Coach

- Setup completo com React, TypeScript, Vite e Tailwind CSS
- Seções: Hero, Sobre, Serviços, Calendário, Galeria e Contato
- Animações de scroll e efeitos visuais
- Calendário interativo com filtros
- Botão flutuante WhatsApp
- Design responsivo e moderno"
```

### Linux/Mac

Execute o script fornecido:

```bash
chmod +x setup-git.sh
./setup-git.sh
```

Ou execute os comandos manualmente (mesmos comandos acima, mas sem aspas no caminho).

## Passo 2: Criar Repositório no GitHub

1. Acesse [https://github.com/new](https://github.com/new)
2. Preencha os campos:
   - **Repository name**: `falcao-coach-landing` (ou outro nome de sua preferência)
   - **Description**: "Landing page profissional para Falcão Coach - Treinador de Vôlei de Praia e Indoor"
   - **Visibility**: Escolha Público ou Privado
   - **IMPORTANTE**: NÃO marque nenhuma opção de inicialização (README, .gitignore, license)
3. Clique em **"Create repository"**

## Passo 3: Conectar Repositório Local ao GitHub

Após criar o repositório no GitHub, você verá instruções. Execute os seguintes comandos:

```bash
# Adicionar remote
git remote add origin https://github.com/CarlosEduardoLago/falcao-coach-landing.git

# Fazer push do código
git push -u origin main
```

Ou use o script automatizado:
```powershell
.\conectar-github.ps1
```

### Autenticação

Se solicitado, você precisará autenticar:

**Opção 1 - Token de Acesso Pessoal (Recomendado):**
1. Vá em GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Gere um novo token com permissões `repo`
3. Use o token como senha quando solicitado

**Opção 2 - GitHub CLI:**
```bash
gh auth login
```

**Opção 3 - SSH:**
Se você tem SSH configurado:
```bash
git remote set-url origin git@github.com:CarlosEduardoLago/falcao-coach-landing.git
git push -u origin main
```

## Passo 4: Configurar GitHub Pages (Opcional)

Para hospedar o site no GitHub Pages:

1. No repositório GitHub, vá em **Settings** → **Pages**
2. Em **Source**, selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Clique em **Save**

O site estará disponível em: `https://CarlosEduardoLago.github.io/falcao-coach-landing`

## Passo 5: Configurar GitHub Actions (Opcional)

Os workflows já estão configurados nos arquivos:
- `.github/workflows/ci.yml` - Executa lint e build em cada push
- `.github/workflows/deploy.yml` - Faz deploy automático para GitHub Pages

Para ativar:

1. Certifique-se de que fez push do código
2. Os workflows serão executados automaticamente
3. Para o deploy funcionar, você precisa:
   - Habilitar GitHub Pages (Passo 4)
   - O workflow criará a branch `gh-pages` automaticamente

## Verificação

Após o push, verifique:

1. Acesse seu repositório no GitHub
2. Você deve ver todos os arquivos do projeto
3. O README deve estar visível na página inicial
4. Os badges devem aparecer (após alguns minutos)

## Comandos Úteis

```bash
# Ver status do repositório
git status

# Ver histórico de commits
git log --oneline

# Ver remotes configurados
git remote -v

# Atualizar código local com GitHub
git pull origin main

# Fazer push de novas alterações
git add .
git commit -m "sua mensagem de commit"
git push origin main
```

## Solução de Problemas

### Erro: "Permission denied"
- Verifique suas credenciais do GitHub
- Use um token de acesso pessoal em vez de senha

### Erro: "Repository not found"
- Verifique se o nome do repositório está correto
- Verifique se você tem permissão para acessar o repositório

### Erro: "Branch 'main' has no upstream branch"
- Execute: `git push -u origin main`

## Próximos Passos

- [ ] Adicionar descrição e tópicos no repositório GitHub
- [ ] Configurar proteções de branch (Settings → Branches)
- [ ] Adicionar templates de Issues e Pull Requests
- [ ] Configurar dependabot para atualizações automáticas
- [ ] Adicionar mais badges ao README conforme necessário

## Suporte

Se encontrar problemas, consulte:
- [Documentação do Git](https://git-scm.com/doc)
- [Documentação do GitHub](https://docs.github.com)
- [GitHub Community Forum](https://github.community)
