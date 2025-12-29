# Personalizar

Aqui forneceremos algumas dicas sobre como personalizar o site. Uma coisa importante a observar é que **TODAS** as alterações que você fizer devem ser realizadas na branch **main** do seu repositório. A branch `gh-pages` é automaticamente sobrescrita sempre que você modifica a branch main.

Note que, ao longo dos arquivos [README.md](README.tr-tr.md) e [CUSTOMIZE.md](CUSTOMIZE.tr-tr.md), o idioma padrão é o inglês (LANG = en-us). Você deve ter um arquivo ou caminho equivalente para cada idioma definido em [\_config.yml](_config.yml). Por exemplo, se você definiu `languages: ["en-us", "tr-tr"]`, deverá haver 2 versões do arquivo `_data/LANG/cv.yml`: [\_data/en-us/cv.yml](_data/en-us/cv.yml) e [\_data/tr-tr/cv.yml](_data/tr-tr/cv.yml).

## Estrutura do Projeto

O projeto está estruturado da seguinte forma, com foco nos principais componentes que você precisará modificar:

```txt
.
├── 📂 assets/: contém os recursos exibidos no site
│   └── 📂 json/
│       └── 📄 resume_LANG.json: Currículo em formato JSON (https://jsonresume.org/)
├── 📂 _bibliography/
│   └── 📄 papers.bib: bibliografia em formato BibTeX
├── 📂 _books/: contém as páginas da coleção de livros
│   └── 📂 LANG/: deve existir uma para cada idioma definido em _config.yml
├── 📄 _config.yml: o arquivo de configuração do template
├── 📂 _data/: contém alguns dos dados utilizados no template
│   ├── 📂 LANG/: dados para a versão LANG. Deve existir uma para cada idioma definido em _config.yml
│   │   ├── 📄 cv.yml: Currículo em formato YAML, utilizado quando assets/json/resume_LANG.json não existe
|   |   └── 📄 strings.yml: variáveis localizadas (placeholders). Deve existir uma para cada idioma definido em _config.yml
│   ├── 📄 repositories.yml: informações de usuários e repositórios em formato YAML
│   └── 📄 socials.yml: suas informações de redes sociais e contato em formato YAML
├── 📂 _includes/: contém partes de código que são incluídas no HTML principal
│   └── 📄 news.liquid: define o layout da seção de notícias na página "Sobre"
├── 📂 _layouts/: contém os layouts disponíveis para serem escolhidos no frontmatter dos arquivos Markdown
├── 📂 _news/: as notícias que aparecerão na seção de notícias na página "Sobre"
│   └── 📂 LANG/: deve existir uma para cada idioma definido em _config.yml
├── 📂 _pages/: contém as páginas do site
│   └── 📂 LANG/: deve existir uma para cada idioma definido em _config.yml
|       └── 📄 404.md: página 404 (não encontrada)
├── 📂 _posts/: contém os posts do blog
│   └── 📂 LANG/: deve existir uma para cada idioma definido em _config.yml
├── 📂 _projects/: contém os projetos
│   └── 📂 LANG/: deve existir uma para cada idioma definido em _config.yml
└── 📂 _sass/: contém os arquivos SASS que definem o estilo do site
    ├── 📄 _base.scss: estilo base do site
    ├── 📄 _cv.scss: estilo da página do currículo
    ├── 📄 _distill.scss: estilo dos artigos no formato Distill
    ├── 📄 _layout.scss: estilo do layout geral
    ├── 📄 _themes.scss: cores dos temas e alguns ícones
    └── 📄 _variables.scss: variáveis utilizadas nos arquivos SASS
```

## Configuração

O arquivo de configuração [\_config.yml](_config.yml) contém as principais configurações do site. A maioria das opções é autoexplicativa e também tentamos adicionar o máximo de comentários possível. Se você tiver alguma dúvida, verifique se ela já não foi respondida nas [Perguntas Frequentes](FAQ.tr-tr.md).

> Note que as configurações `url` e `baseurl` são utilizadas para gerar os links do site, conforme explicado nas [instruções de instalação](INSTALL.tr-tr.md).

Todas as alterações feitas neste arquivo só são visíveis após você reconstruir o site. Isso significa que você precisará executar novamente `bundle exec jekyll serve` se estiver rodando o site localmente ou enviar (push) suas alterações para o GitHub se estiver utilizando o GitHub Pages. Todas as outras alterações são visíveis imediatamente, bastando atualizar a página.

## Modificando as informações do CV

Atualmente, existem 2 maneiras diferentes de gerar o conteúdo da página do CV. A primeira utiliza um arquivo JSON localizado em [assets/json/resume_LANG.json](assets/json/resume_en-us.json). Trata-se de um [padrão conhecido](https://jsonresume.org/) para criar um currículo de forma programática. A segunda, atualmente usada como alternativa quando o arquivo JSON não é encontrado, utiliza um arquivo YML localizado em [\_data/LANG/cv.yml](_data/en-us/cv.yml). Essa foi a forma original de criar o conteúdo da página do CV e, por ser mais legível para humanos do que um arquivo JSON, decidimos mantê-la como opção.

Isso significa que, se não houver dados do currículo definidos em [\_config.yml](_config.yml) e carregados via um arquivo JSON, serão carregados os conteúdos de [\_data/LANG/cv.yml](_data/en-us/cv.yml). Se você deseja usar o arquivo [\_data/LANG/cv.yml](_data/en-us/cv.yml) como fonte do seu currículo, deverá excluir o arquivo [assets/json/resume_LANG.json](assets/json/resume_en-us.json).

## Modificando as informações do usuário e do repositório

As informações do usuário e do repositório são definidas em [\_data/repositories.yml](_data/repositories.yml). Você pode adicionar quantos usuários e repositórios desejar. Ambas as informações são utilizadas na seção `repositories`.

## Criando novas páginas

Você pode criar novas páginas adicionando novos arquivos Markdown no diretório [\_pages](_pages/). A maneira mais simples de fazer isso é copiando uma página existente e modificando-a. Você pode escolher o layout da página alterando o atributo [layout](https://jekyllrb.com/docs/layouts/) no [frontmatter](https://jekyllrb.com/docs/front-matter/) do arquivo Markdown, e também o caminho para acessá-la alterando o atributo [permalink](https://jekyllrb.com/docs/permalinks/). Você também pode adicionar novos layouts no diretório [\_layouts](_layouts/) se achar necessário. Para que a página seja exibida em diferentes idiomas, basta criar um arquivo Markdown com o mesmo nome para cada idioma. É possível [usar permalinks diferentes por idioma](https://github.com/untra/polyglot?tab=readme-ov-file#using-different-permalinks-per-language) se desejar.

## Criando novos posts de blog

Para criar um novo post de blog, você pode adicionar um novo arquivo Markdown no diretório [\_posts/LANG/](_posts/en-us/). O [nome do arquivo deve seguir](https://jekyllrb.com/docs/posts/#creating-posts) o formato `YYYY-MM-DD-title.md`. A maneira mais simples de fazer isso é copiando um post existente e modificando-o. Note que alguns posts possuem campos opcionais no [frontmatter](https://jekyllrb.com/docs/front-matter/) que são utilizados para habilitar comportamentos ou funções específicas.

Se você deseja criar posts que ainda não estão prontos para serem publicados, mas quer versioná-los com o git, pode criar um diretório [\_drafts](https://jekyllrb.com/docs/posts/#drafts) e armazená-los nele.

Observe que `posts` também é uma coleção, mas é uma coleção padrão criada automaticamente pelo Jekyll. Para acessar os posts, você pode utilizar a variável `site.posts` em seus templates.

## Criando novos projetos

Você pode criar novos projetos adicionando novos arquivos Markdown no diretório [\_projects/LANG/](_projects/en-us/). A maneira mais simples de fazer isso é copiando um projeto existente e modificando-o.

## Adicionando algumas notícias

Você pode adicionar notícias na página "Sobre" adicionando novos arquivos Markdown no diretório [\_news/LANG/](_news/en-us/). Atualmente, existem dois tipos de notícias: notícias embutidas e notícias com link. Notícias com link levam você para uma nova página, enquanto notícias embutidas são exibidas diretamente na página “Sobre”. A maneira mais simples de criar as suas é copiando uma notícia existente e modificando-a.

## Adicionando Coleções

Este tema Jekyll implementa [coleções](https://jekyllrb.com/docs/collections/) para que você possa dividir seu trabalho em categorias. O tema já vem com três coleções padrão: `news`, `projects` e `books`. Os itens da collection `news` são exibidos automaticamente na página inicial, enquanto os itens da collection `projects` são exibidos em uma grade responsiva na página de projetos e os itens da collection `books` são exibidos em sua própria página de estante dentro dos submenus.

Você pode facilmente criar suas próprias coleções, como apps, contos, cursos ou qualquer outro trabalho criativo. Para isso, edite as coleções no arquivo [\_config.yml](_config.yml), crie uma pasta correspondente e crie uma página de destino para sua collection, semelhante a [\_pages/LANG/projects.md](_pages/en-us/projects.md).

Se desejar criar uma collection com suporte para categorias e tags, como os posts do blog, basta adicionar essa collection à seção `jekyll-archives` do arquivo [\_config.yml](_config.yml). Você pode ver como isso é feito com a coleção `books`. Para mais informações sobre como personalizar a seção de arquivos ou criar sua própria página de arquivos, consulte a [documentação do jekyll-archives-v2](https://george-gca.github.io/jekyll-archives-v2/).

Para acessar as coleções, você pode utilizar a variável `site.COLLECTION_NAME` em seus templates.

## Adicionando uma nova publicação

Para adicionar publicações, crie uma nova entrada no arquivo [\_bibliography/papers.bib](_bibliography/papers.bib). Você pode encontrar a entrada BibTeX de uma publicação no Google Scholar clicando nas aspas abaixo do título da publicação, depois em "BibTeX", ou também diretamente na página da conferência. Por padrão, as publicações serão ordenadas por ano e as mais recentes serão exibidas primeiro. Você pode alterar esse comportamento e outras configurações na seção `Jekyll Scholar` do arquivo [\_config.yml](_config.yml).

Você pode adicionar informações extras a uma publicação, como um arquivo PDF no diretório `assets/pdfs/`, e adicionar o caminho para esse arquivo na entrada BibTeX com o campo `pdf`. Alguns dos campos suportados são: `abstract`, `altmetric`, `annotation`, `arxiv`, `bibtex_show`, `blog`, `code`, `dimensions`, `doi`, `eprint`, `html`, `isbn`, `pdf`, `pmid`, `poster`, `slides`, `supp`, `video` e `website`.

### Anotação do autor

Em publicações, a entrada do autor para você mesmo é identificada pelo array de strings `scholar:last_name` e pelo array de strings `scholar:first_name` em [\_config.yml](_config.yml). Por exemplo, se você tiver a seguinte entrada em seu [\_config.yml](_config.yml):

```yaml
scholar:
  last_name: [Einstein]
  first_name: [Albert, A.]
```

Se a entrada corresponder a alguma forma dos sobrenomes e dos primeiros nomes, ela será sublinhada. Mantenha as meta-informações sobre seus coautores em [\_data/coauthors.yml](_data/coauthors.yml) e o Jekyll inserirá automaticamente links para as páginas deles. O formato dos dados dos coautores é o seguinte, com os sobrenomes em minúsculas e sem acentos, sendo a chave:

```yaml
"adams":
  - firstname: ["Edwin", "E.", "E. P.", "Edwin Plimpton"]
    url: https://en.wikipedia.org/wiki/Edwin_Plimpton_Adams

"podolsky":
  - firstname: ["Boris", "B.", "B. Y.", "Boris Yakovlevich"]
    url: https://en.wikipedia.org/wiki/Boris_Podolsky

"rosen":
  - firstname: ["Nathan", "N."]
    url: https://en.wikipedia.org/wiki/Nathan_Rosen

"bach":
  - firstname: ["Johann Sebastian", "J. S."]
    url: https://en.wikipedia.org/wiki/Johann_Sebastian_Bach

  - firstname: ["Carl Philipp Emanuel", "C. P. E."]
    url: https://en.wikipedia.org/wiki/Carl_Philipp_Emanuel_Bach
```

Se a entrada corresponder a uma das combinações dos sobrenomes e dos primeiros nomes, ela será destacada e vinculada à URL fornecida. Note que as chaves **DEVEM SER** todas em minúsculas e **NÃO DEVEM** conter acentos, pois elas são utilizadas para comparar os sobrenomes nas entradas BibTeX, considerando possíveis variações (veja a [discussão relacionada](https://github.com/alshedivat/al-folio/discussions/2213)).

### Botões (através de palavras-chave BibTeX personalizadas)

Existem diversas palavras-chave BibTeX personalizadas que você pode utilizar para influenciar a forma como as entradas são exibidas na página:

- `abbr`: Adiciona uma abreviação à esquerda da entrada. Você pode criar links para essas abreviações criando um arquivo venue.yaml na pasta \_data e adicionando as entradas correspondentes.
- `abstract`: Adiciona um botão “Abs” que expande um campo de texto oculto quando clicado para exibir o resumo.
- `altmetric`: Adiciona um selo do [Altmetric](https://www.altmetric.com/) (Nota: se o DOI for fornecido, utilize apenas `true`; caso contrário, adicione apenas o identificador altmetric – o link é gerado automaticamente).
- `annotation`: Adiciona uma mensagem informativa em popover ao final da lista de autores, que pode ser utilizada para esclarecer sobrescritos. HTML é permitido.
- `arxiv`: Adiciona um link para o site do Arxiv (Nota: adicione apenas o identificador arxiv – o link é gerado automaticamente).
- `bibtex_show`: Adiciona um botão “Bib” que expande um campo de texto oculto com a entrada bibliográfica completa.
- `blog`: Adiciona um botão “Blog” que redireciona para o link especificado.
- `code`: Adiciona um botão “Code” que redireciona para o link especificado.
- `dimensions`: Adiciona um selo do [Dimensions](https://www.dimensions.ai/) (Nota: se o DOI ou PMID for fornecido, utilize apenas `true`; caso contrário, adicione apenas o identificador do Dimensions – o link é gerado automaticamente).
- `html`: Insere um botão “HTML” que redireciona para o link especificado pelo usuário.
- `pdf`: Adiciona um botão “PDF” que redireciona para um arquivo especificado (se um link completo não for fornecido, assume-se que o arquivo está no diretório /assets/pdf/).
- `poster`: Adiciona um botão “Poster” que redireciona para um arquivo especificado (se um link completo não for fornecido, assume-se que o arquivo está no diretório /assets/pdf/).
- `slides`: Adiciona um botão “Slides” que redireciona para um arquivo especificado (se um link completo não for fornecido, assume-se que o arquivo está no diretório /assets/pdf/).
- `supp`: Adiciona um botão “Supp” para um arquivo especificado (se um link completo não for fornecido, assume-se que o arquivo está no diretório /assets/pdf/).
- `website`: Adiciona um botão “Website” que redireciona para o link especificado.

Você pode implementar seus próprios botões editando o arquivo [\_layouts/bib.liquid](_layouts/bib.liquid).

## Alterando a cor do tema

Uma variedade de belas cores de tema foi selecionada para você escolher. O padrão é roxo, mas você pode alterá-la rapidamente editando a variável `--global-theme-color` no arquivo [\_sass/\_themes.scss](_sass/_themes.scss). Outras variáveis de cor também estão listadas nesse arquivo. As opções de cores padrão disponíveis podem ser encontradas em [\_sass/\_variables.scss](_sass/_variables.scss). Você também pode adicionar suas próprias cores a este arquivo, atribuindo a cada uma um nome para facilitar seu uso no template.

## Adicionando informações de redes sociais

Você pode adicionar os links para suas redes sociais inserindo as informações especificadas no arquivo [\_data/socials.yml](_data/socials.yml). Essas informações aparecerão no rodapé da página “About” e nos resultados de busca por padrão, mas isso pode ser alterado para que apareçam no cabeçalho da página definindo `enable_navbar_social: true` e, para que não apareçam na busca, definindo `socials_in_search: false`, ambas no arquivo [\_config.yml](_config.yml).

## Adicionando uma newsletter

Você pode adicionar um formulário de inscrição para newsletter inserindo as informações especificadas na seção `newsletter` do arquivo [\_config.yml](_config.yml). Para configurar uma newsletter, você pode utilizar um serviço como o [Loops.so](https://loops.so/), que é a solução atualmente suportada. Uma vez configurada a sua newsletter, você pode adicionar o [endpoint](https://loops.so/docs/forms/custom-form) do formulário no campo `endpoint` da seção `newsletter` do arquivo [\_config.yml](_config.yml).

Dependendo do comportamento do rodapé que você especificou, o formulário de inscrição aparecerá no final da página “About” e ao final dos posts do blog, se os `related_posts` estiverem habilitados, ou no rodapé de cada página.

## Removendo conteúdo

Como este template possui muito conteúdo, pode ser que você queira remover parte dele. A maneira mais simples de fazer isso e evitar conflitos de merge ao atualizar seu código (como [apontado por CheariX](https://github.com/alshedivat/al-folio/pull/2933#issuecomment-2571271117)) é adicionar os arquivos indesejados à seção `excludes` do seu arquivo [\_config.yml](_config.yml) em vez de deletá-los, por exemplo:

```yml
exclude:
  - _news/**/announcement_*.md
  - _pages/**/blog.md
  - _posts/
  - _projects/**/?_project.md
  - assets/jupyter/blog.ipynb
```

Aqui está uma lista dos principais componentes que você pode querer remover e como fazê-lo. Não se esqueça de atualizar a propriedade `nav_order` das páginas restantes se você deletar alguma página.

### Removendo a página do blog

Para remover o blog, você deve:

- excluir o diretório [\_posts](_posts/)
- excluir as páginas do blog em `_pages/LANG/blog.md`
- remover a referência à página do blog em `_pages/LANG/dropdown.md`
- remover a parte `latest_posts` em `_pages/LANG/about.md`
- remover a seção `Blog` do arquivo [\_config.yml](_config.yml) e as partes relacionadas, como o `jekyll-archives`

Você também pode:

- excluir [\_includes/latest_posts.liquid](_includes/latest_posts.liquid)
- excluir [\_includes/related_posts.liquid](_includes/related_posts.liquid)
- excluir [\_layouts/archive.liquid](_layouts/archive.liquid) (a menos que você tenha uma collection personalizada que o utilize)
- excluir [\_plugins/external-posts.rb](_plugins/external-posts.rb)
- remover a gem `jekyll-archives-v2` do [Gemfile](Gemfile) e a seção `plugins` do arquivo [\_config.yml](_config.yml) (a menos que você tenha uma collection personalizada que a utilize)
- remover a gem `classifier-reborn` do [Gemfile](Gemfile)

### Removendo a seção de notícias

Para remover a seção de notícias, você pode:

- excluir o diretório [\_news](_news/)
- excluir o arquivo [\_includes/news.liquid](_includes/news.liquid) e as referências a ele em `_pages/LANG/about.md`
- remover a parte `announcements` em `_pages/LANG/about.md`
- remover a parte de notícias na seção `Collections` do arquivo [\_config.yml](_config.yml)

### Removendo a página de projetos

Para remover os projetos, você pode:

- excluir o diretório [\_projects](_projects/)
- excluir a página de projetos em `_pages/LANG/projects.md`
- remover a referência à página de projetos em `_pages/LANG/dropdown.md`
- remover a parte dos projetos na seção `Collections` do arquivo [\_config.yml](_config.yml)

Você também pode:

- excluir [\_includes/projects_horizontal.liquid](_includes/projects_horizontal.liquid)
- excluir [\_includes/projects.liquid](_includes/projects.liquid)

### Removendo a página de publicações

Para remover as publicações, você pode:

- excluir o diretório [\_bibliography](_bibliography/)
- excluir a página de publicações em `_pages/LANG/publications.md`
- remover a referência à página de publicações em `_pages/LANG/dropdown.md`
- remover a seção `Jekyll Scholar` do arquivo [\_config.yml](_config.yml)

Você também pode:

- excluir o arquivo [\_layouts/bib.liquid](_layouts/bib.liquid)
- excluir [\_includes/bib_search.liquid](_includes/bib_search.liquid)
- excluir [\_includes/citation.liquid](_includes/citation.liquid)
- excluir [\_includes/selected_papers.liquid](_includes/selected_papers.liquid)
- excluir [\_plugins/google-scholar-citations.rb](_plugins/google-scholar-citations.rb)
- excluir [\_plugins/hide-custom-bibtex.rb](_plugins/hide-custom-bibtex.rb)
- excluir [\_plugins/inspirehep-citations.rb](_plugins/inspirehep-citations.rb)
- remover a gem `jekyll-scholar` do [Gemfile](Gemfile) e a seção `plugins` do arquivo [\_config.yml](_config.yml)

### Removendo a página de repositórios

Para remover os repositórios, você pode:

- excluir a página de repositórios em `_pages/LANG/repositories.md`
- excluir o diretório [\_includes/repository/](_includes/repository/)

## Adicionando Token para o Lighthouse Badger

Para adicionar segredos para o [lighthouse-badger](https://github.com/alshedivat/al-folio/actions/workflows/lighthouse-badger.yml), crie um [personal access token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) e adicione-o como um [secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-encrypted-secrets-for-a-repository) denominado `LIGHTHOUSE_BADGER_TOKEN` ao seu repositório. A [documentação do lighthouse-badger](https://github.com/MyActionWay/lighthouse-badger-workflows#lighthouse-badger-easyyml) especifica o uso de uma variável de ambiente, mas utilizá-lo como secret é mais seguro e apropriado para um PAT.

Caso você encontre o erro: "Input required and not supplied: token" na ação do Lighthouse Badger, essa solução deverá resolvê-lo.

### Permissões do Personal Access Token (fine-grained) para o Lighthouse Badger:

- **contents**: acesso: leitura e escrita
- **metadata**: acesso: somente leitura

Devido às permissões necessárias mencionadas, recomenda-se usá-lo como secret ao invés de como variável de ambiente.

## Personalizando fontes, espaçamento e mais

Você pode personalizar as fontes, os espaçamentos e outros aspectos editando o arquivo [\_sass/\_base.scss](_sass/_base.scss). A maneira mais simples de testar as alterações antecipadamente é utilizando as [ferramentas de desenvolvedor do Chrome](https://developer.chrome.com/docs/devtools/css) ou as [ferramentas de desenvolvedor do Firefox](https://firefox-source-docs.mozilla.org/devtools-user/). Nelas, você pode clicar em um elemento e visualizar todos os atributos definidos para ele, bem como a origem desses estilos. Para mais informações sobre como utilizar esses recursos, consulte os tutoriais do [Chrome](https://developer.chrome.com/docs/devtools/css), do [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html) e [este tutorial em vídeo](https://www.youtube.com/watch?v=l0sgiwJyEu4).

## Posts Agendados

O `al-folio` contém um workflow que publica automaticamente todos os posts agendados para um determinado dia, no final do dia (23:30). Por padrão, a ação está desabilitada e, para habilitá-la, você precisa ir para o diretório `.github/workflows/` e encontrar o arquivo chamado `schedule-posts.txt`. Este é o arquivo do workflow. Para que o GitHub o reconheça como tal (ou para habilitar a ação), você precisa renomeá-lo para `schedule-posts.yml`.

Para utilizá-lo, salve todos os seus posts "Concluídos" que estão agendados para serem publicados em uma data específica, em uma pasta chamada `_scheduled/` no diretório raíz.

> Posts incompletos devem ser salvos em `_drafts/`

### Formato de Nome

Nesta pasta, os arquivos devem ser salvos no mesmo formato que seriam salvos em `_posts/`, incluindo o diretório de idioma.

> Exemplo de nome de arquivo: `2024-08-26-This file will be uploaded on 26 August.md`

### Notas Importantes

- O scheduler publica os posts todos os dias às 🕛 23:30 UTC.
- Ele publicará os posts somente às 23:30 UTC dos respectivos dias agendados; não ocorre às 23:59, caso haja muitos arquivos, pois o scheduler precisa finalizar antes da meia-noite.
- Serão publicados somente arquivos que seguem o padrão `yyyy-mm-dd-title.md`:
  - Isso significa que apenas arquivos Markdown serão publicados.
  - Qualquer arquivo Markdown que não siga esse padrão não será publicado.
- O scheduler funciona movendo os posts do diretório `_scheduled/` para `_posts/`; ele não publica em pastas como `_projects/` ou `_news/`.
- A data no nome do arquivo indica o dia em que o arquivo será publicado:
  - `2024-08-27-file1.md` não será publicado antes nem depois de 27 de agosto de 2024 (o scheduler funciona apenas para posts agendados para o dia presente).
  - `2025-08-27-file2.md` será publicado exatamente em 27 de agosto de 2025.
  - `File3.md` não será publicado.
  - `2026-02-31-file4.md` está programado para ser publicado em 31 de fevereiro de 2026, mas como fevereiro não tem 31 dias, esse arquivo nunca será publicado.
