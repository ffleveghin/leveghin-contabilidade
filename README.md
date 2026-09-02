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

- `index.html` — página inicial
- `planos.html` — página de planos (Básico / Intermediário / Completo)
- `calculos-judiciais.html` — página de Cálculos Judiciais (Trabalhistas / Cíveis)
- `assets/servico.css` — estilo compartilhado das páginas de serviço, planos e cálculos
- `servicos/*.html` — uma página por serviço (com formulário de captação de lead)
- `CNAME` — domínio customizado para o GitHub Pages

## Importante ao subir para o GitHub

Essa versão tem **pastas** (`assets/` e `servicos/`), não é mais um arquivo único. Ao subir pelo GitHub:

1. Vá em **Add file → Upload files**.
2. Arraste a pasta `assets` inteira, a pasta `servicos` inteira, e o `index.html` — o GitHub reconhece a estrutura de pastas ao arrastar.
3. Se o GitHub não aceitar arrastar pastas direto (alguns navegadores não permitem), suba os arquivos um a um mantendo os mesmos caminhos: `assets/servico.css`, `servicos/assessoria-contabil.html`, etc. — o nome da pasta faz parte do caminho do arquivo, então ao clicar "choose your files" e selecionar, o GitHub tende a preservar a estrutura se os arquivos forem arrastados como pastas do Explorer/Finder.

## Como funciona o formulário de cada serviço

Como o site é estático (GitHub Pages, sem backend), o formulário não "envia" para um servidor. Ao clicar em "Falar com especialista":
- Se a pessoa escolheu **WhatsApp**, abre uma nova aba do WhatsApp já com a mensagem preenchida com todos os dados do formulário.
- Se escolheu **E-mail**, abre o programa de e-mail padrão com assunto e corpo preenchidos, destinado a `contato@leveghincontabilidade.com.br`.

Se no futuro você quiser que esses dados caiam direto numa planilha ou CRM (sem depender do WhatsApp/e-mail do visitante), posso integrar com Google Forms, Formspree ou outro serviço.
