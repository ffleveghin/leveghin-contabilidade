# Site — Leveghin Contabilidade

Site institucional de página única (`index.html`), sem dependências externas de build — HTML/CSS/JS puro, pronto para GitHub Pages.

## Como publicar no GitHub Pages com domínio próprio

1. **Crie um repositório** no GitHub (ex.: `leveghin-contabilidade`).
2. Suba os arquivos `index.html` e `CNAME` para a raiz do repositório (branch `main`).
3. No repositório, vá em **Settings → Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main` / pasta `/ (root)`
4. **Configure o DNS** do domínio `leveghincontabilidade.com.br` (no seu provedor de domínio):
   - Registro **A** apontando `@` para os IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Registro **CNAME** apontando `www` para `SEUUSUARIO.github.io`
5. Volte em Settings → Pages e confirme o campo "Custom domain" com `leveghincontabilidade.com.br` (o arquivo `CNAME` já está incluído no projeto, então o GitHub deve reconhecer automaticamente).
6. Marque **Enforce HTTPS** depois que o certificado for emitido (pode levar algumas horas).

## O que ainda vale ajustar

- **Texto "Sobre mim"**: escrevi um rascunho com base nas suas especialidades — não tive acesso ao seu LinkedIn (sem navegação neste ambiente). Revise o texto na seção `#sobre` do `index.html`.
- **E-mail sugerido**: `contato@leveghincontabilidade.com.br` — troque se preferir outro (ex.: `fadrick@...`).
- **CRC**: usei `012345/O-0` como placeholder (visto na peça gráfica) — confirme o número real.
- **Formulário de contato**: como é site estático (GitHub Pages não roda backend), os CTAs vão direto para WhatsApp e e-mail. Se quiser um formulário funcional depois, posso integrar um serviço como Formspree ou um Google Form embutido.

## Estrutura

- `index.html` — site completo (HTML + CSS + JS inline, sem build)
- `CNAME` — domínio customizado para o GitHub Pages
