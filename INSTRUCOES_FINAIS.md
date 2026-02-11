# Instruções Finais - Conectar ao GitHub

## Status Atual

✅ Repositório criado no GitHub: `falcao-coach-landing`
✅ Scripts preparados
✅ Workflows configurados
✅ Vite configurado para GitHub Pages

## Próximo Passo: Conectar e Fazer Push

### Opção 1: Usar o Script Automático (Recomendado)

No PowerShell, execute:

```powershell
cd "c:\cursor\Falcão Coach"
.\conectar-github.ps1
```

O script irá:
1. Solicitar seu username do GitHub
2. Adicionar o remote origin
3. Fazer push do código
4. Mostrar links úteis

### Opção 2: Comandos Manuais

Se preferir fazer manualmente:

```powershell
# 1. Adicionar remote
git remote add origin https://github.com/CarlosEduardoLago/falcao-coach-landing.git

# 2. Verificar branch
git branch -M main

# 3. Fazer push
git push -u origin main
```

Ou use o script automatizado:
```powershell
.\push-github.ps1
```

## Autenticação

Se solicitar credenciais:

### Opção A: Personal Access Token (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Dê um nome (ex: "Falcao Coach Landing")
4. Selecione escopo: `repo` (marcar todas as opções de repo)
5. Clique em "Generate token"
6. **Copie o token** (só aparece uma vez!)
7. Quando o Git pedir senha, use o token (não sua senha)

### Opção B: GitHub CLI

```powershell
gh auth login
```

### Opção C: SSH

Se você tem SSH configurado:

```powershell
git remote set-url origin git@github.com:CarlosEduardoLago/falcao-coach-landing.git
git push -u origin main
```

## Após o Push

### 1. Verificar Push Bem-Sucedido

Execute:

```powershell
.\verificar-github.ps1
```

Ou acesse diretamente:
- Repositório: https://github.com/CarlosEduardoLago/falcao-coach-landing
- Actions: https://github.com/CarlosEduardoLago/falcao-coach-landing/actions

### 2. Configurar GitHub Pages

1. No repositório GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - **Source**: GitHub Actions
4. Clique em **Save**

### 3. Aguardar Deploy

- O workflow de deploy será executado automaticamente
- Pode levar 2-5 minutos
- Acompanhe em: **Actions** → **Build and Deploy**

### 4. Acessar o Site

Após o deploy, o site estará disponível em:

```
https://CarlosEduardoLago.github.io/falcao-coach-landing
```

## Verificação Final

Execute o script de verificação:

```powershell
.\verificar-github.ps1
```

Este script mostra:
- Status do repositório
- Links úteis
- Próximos passos

## Troubleshooting

### Erro: "Repository not found"
- Verifique se o repositório existe no GitHub
- Verifique se o username está correto
- Verifique permissões de acesso

### Erro: "Authentication failed"
- Use Personal Access Token em vez de senha
- Ou configure SSH keys
- Ou use GitHub CLI: `gh auth login`

### Erro: "Updates were rejected"
- Alguém fez push antes de você
- Execute: `git pull origin main --rebase`
- Depois: `git push origin main`

### Workflow falha no deploy
- Verifique se GitHub Pages está habilitado
- Verifique se a branch `gh-pages` foi criada
- Veja os logs em **Actions** para detalhes

## Arquivos Úteis

- `conectar-github.ps1` - Conecta e faz push
- `verificar-github.ps1` - Verifica status
- `executar-git.ps1` - Inicializa Git e cria commit
- `GITHUB_SETUP.md` - Guia completo

## Suporte

Se encontrar problemas:
1. Execute `git status` para ver o estado
2. Execute `git remote -v` para verificar remotes
3. Consulte os logs em **Actions** no GitHub
4. Verifique a documentação: `GITHUB_SETUP.md`
