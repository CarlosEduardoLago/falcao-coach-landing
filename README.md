# Landing Page - Falcão Coach

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Landing page profissional para o Falcão Coach, treinador de Vôlei de Praia e Indoor Nível III - CBV.

🔗 **Repositório GitHub:** [falcao-coach-landing](https://github.com/CarlosEduardoLago/falcao-coach-landing)

## 🚀 Características

- ✨ Design moderno e responsivo
- 🎨 Animações suaves de scroll
- 📅 Calendário interativo de horários
- 💬 Botão flutuante WhatsApp
- 🎯 Otimizado para performance
- ♿ Acessível e semântico

## Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Solução de Problemas

Se você encontrar problemas ao iniciar o servidor devido a caracteres especiais no caminho:

1. **Certifique-se de estar no diretório correto:**
   ```powershell
   cd "c:\cursor\Falcão Coach"
   ```

2. **Instale as dependências:**
   ```powershell
   npm install
   ```

3. **Inicie o servidor:**
   ```powershell
   npm run dev
   ```

4. **Se ainda houver problemas, limpe o cache:**
   ```powershell
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
   npm install
   npm run dev
   ```

## Build

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist`.

## Estrutura do Projeto

```
src/
  components/
    sections/     # Seções da landing page
    ui/           # Componentes reutilizáveis
  data/           # Dados e configurações
  types/          # Definições TypeScript
  App.tsx         # Componente principal
  main.tsx        # Entry point
  index.css       # Estilos globais
```

## Seções

1. **Hero** - Apresentação principal com logo e CTA
2. **Sobre** - Credenciais e informações do coach
3. **Serviços** - Cards de Vôlei de Praia e Indoor
4. **Calendário** - Horários interativos com filtros
5. **Galeria** - Grid de imagens com lightbox
6. **Contato** - Informações de contato e redes sociais

## 📦 Deploy

O projeto pode ser facilmente deployado em:

- [GitHub Pages](https://pages.github.com) - Deploy automático via Actions
- [Vercel](https://vercel.com) - Recomendado para produção
- [Netlify](https://netlify.com)

### GitHub Pages (Automático)

O projeto está configurado para deploy automático via GitHub Actions. Após fazer push para a branch `main`:

1. Vá em **Settings** → **Pages** no repositório GitHub
2. Em **Source**, selecione: **GitHub Actions**
3. O workflow fará deploy automaticamente

O site estará disponível em: `https://CarlosEduardoLago.github.io/falcao-coach-landing`

### Deploy na Vercel

```bash
npm install -g vercel
vercel
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Falcão Coach**
- Treinador de Vôlei de Praia e Indoor Nível III - CBV
- Licenciatura em Educação Física - CREF 1705-G/MA

## 📞 Contato

- WhatsApp: [Fale conosco](https://wa.me/message/Z7GXF3B5IGIWD1)
- Instagram: [@falcaocoach](https://instagram.com/falcaocoach)
- Telefone: 98178-8707 / 99220-0770

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
