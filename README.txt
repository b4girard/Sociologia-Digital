INSTRUÇÕES DE ORGANIZAÇÃO - PROJETO SOCIOLOGIA DIGITAL

Este projeto é um portfólio estático (HTML, CSS, JS), otimizado para dispositivos móveis e acesso via QR Code. Não usa framework nem servidor: o site funciona publicado no GitHub Pages.

=====================================================================
1. ESTRUTURA DE PASTAS
=====================================================================

/SociologiaDigital
│
├── index.html          (Página inicial: galeria com as seções)
├── obra.html           (Página de detalhes, serve para TODAS as obras)
├── README.txt          (Este arquivo)
│
├── css/
│   ├── style.css       (Estilos globais)
│   ├── home.css        (Estilos da página inicial)
│   └── obra.css        (Estilos da página de detalhes)
│
├── js/
│   ├── home.js         (Monta os cards e distribui nas seções da home)
│   ├── obra.js         (Preenche a página de detalhes de uma obra)
│   └── dados/          (BANCO DE DADOS: um arquivo por coleção)
│       ├── pinturas.js
│       ├── esculturas.js
│       ├── fotografias.js
│       ├── bustos.js       (bustos e mulheres nas ciências)
│       └── geral.js        (junta todas as coleções numa lista só)
│
└── assets/
    ├── logo/           (logo.png)
    ├── icons/          (ícones adicionais, se houver)
    ├── imagens/        (fotos principais, organizadas por categoria)
    │   ├── pinturas/
    │   ├── esculturas/
    │   ├── fotografias/
    │   └── bustos/
    │   (dentro de cada categoria pode haver uma subpasta "impressoes",
    │    com as fotos das impressões 3D)
    ├── audio/          (audiodescrições .mp4, por categoria)
    │   ├── pinturas/
    │   ├── esculturas/
    │   ├── fotografias/
    │   └── bustos/
    └── descricao/      (descrições visuais em .txt, por categoria)
        ├── pinturas/
        ├── esculturas/
        ├── fotografias/
        └── bustos/

=====================================================================
2. COMO O SITE FUNCIONA
=====================================================================

1. Cada coleção tem sua lista de obras em js/dados/ (const pinturas = [...],
   const bustos = [...], etc.).
2. O arquivo geral.js junta as listas:
       const geral = [...pinturas, ...esculturas, ...fotografias, ...bustos];
3. A home (home.js) percorre "geral" e cria um card para cada obra, colocando-o
   na seção certa.
4. Cada card leva para obra.html?id=ID-DA-OBRA. O obra.js procura essa obra
   em "geral" e preenche a página.

Ou seja: para colocar uma obra no site basta cadastrar o bloco dela no arquivo
de dados e colocar os arquivos (imagem, áudio, descrição) nas pastas certas.
Não é preciso criar uma página nova nem mexer em HTML.

=====================================================================
3. COMO CADASTRAR UMA OBRA
=====================================================================

Abra o arquivo da coleção em js/dados/ e copie um bloco existente. Cole depois
do último bloco, com uma VÍRGULA entre eles (o último bloco da lista não leva
vírgula).

3.1 Obra comum (pintura, escultura, fotografia)

    {
        id: "operarios",
        tipo: "pintura",
        titulo: "Operários",
        autor: "Tarsila do Amaral",
        ano: "1933",
        tecnica: "Óleo sobre tela",
        descricaoArquivo: "assets/descricao/pinturas/operarios.txt",
        imagem: "assets/imagens/pinturas/operarios.png",
        audio: "assets/audio/pinturas/operarios.mp4"
    }

    tipo deve ser exatamente "pintura", "escultura" ou "fotografia" (minúsculas).

3.2 Busto / mulher nas ciências

    {
        id: "lelia-gonzalez",
        secoes: ["busto", "mulheres_nas_ciencias"],
        titulo: "Lélia Gonzalez",
        subtitulo: "Filósofa e antropóloga",
        biografia: "Texto curto sobre quem foi...",
        frase: "Frase da pessoa, sem aspas (o site coloca as aspas).",
        imagem: "assets/imagens/bustos/lelia_gonzalez.jpg",
        fotoImpressao: "assets/imagens/bustos/impressoes/lelia_gonzalez.jpg",
        audio: ""
    }

    - "secoes" é uma LISTA: a mesma pessoa aparece em todas as seções citadas.
      "busto" = seção Bustos; "mulheres_nas_ciencias" = seção Mulheres nas
      Ciências. Os textos precisam ser IGUAIS aos que o home.js procura.
    - Obras antigas usam "tipo" (um valor só). Bustos usam "secoes".
      O site aceita os dois jeitos.

3.3 Campos disponíveis

    id               Identificador único, sem espaços nem acentos
                     (ex: "lelia-gonzalez"). Vai na URL. NÃO pode repetir
                     entre coleções.
    tipo / secoes    Em qual seção da home aparece (ver acima).
    titulo           Nome que aparece no card e na página.
    subtitulo        Texto curto no card (usado quando não há autor).
    autor, ano,
    tecnica          Caixa amarela da página. Opcionais: se faltarem, a linha
                     some (e a caixa inteira some se nenhum dos três existir).
    biografia        Caixa "Quem foi". Opcional.
    frase            Frase em destaque. Opcional.
    descricaoArquivo Caminho de um .txt com a descrição visual (ver item 4).
    descricaoVisual  Alternativa: o texto da descrição direto no código, entre
                     crases (`...`). Usado se não houver descricaoArquivo.
    imagem           Foto principal (aparece no card e na página). Obrigatória.
    fotoImpressao    Foto da impressão 3D. Opcional: aparece na seção
                     "Nossa impressão" da página.
    audio            Caminho do .mp4 da audiodescrição. Se ficar "" (vazio),
                     o botão de áudio não aparece.

=====================================================================
4. DESCRIÇÕES VISUAIS EM ARQUIVOS .TXT
=====================================================================

As descrições podem ficar em arquivos de texto em assets/descricao/ (um por
obra, dentro da pasta da categoria). Escreva só o texto, sem aspas nem crases,
com uma linha em branco entre os parágrafos. Salve em UTF-8 (padrão do VS Code),
senão os acentos quebram.

No bloco da obra, aponte para o arquivo:
    descricaoArquivo: "assets/descricao/pinturas/operarios.txt",

ATENÇÃO: ler .txt só funciona com o site aberto por um servidor (o site
publicado no GitHub Pages, ou o Live Server do VS Code). Abrir o index.html
com duplo clique (endereço file://) NÃO carrega os .txt.

=====================================================================
5. COMO ADICIONAR MÍDIAS
=====================================================================

1. IMAGENS: salve em assets/imagens/<categoria>/. Formatos: .jpg, .png ou .webp.
   A extensão escrita no código tem que ser IGUAL à do arquivo (.jpg não é .png).
   Para o celular, prefira imagens leves (cerca de 1200 px de largura).
   Fotos de iPhone (.heic) NÃO funcionam: converta para .jpg.

2. IMPRESSÕES 3D: salve em assets/imagens/<categoria>/impressoes/ e cadastre
   no campo "fotoImpressao".

3. ÁUDIOS: salve em assets/audio/<categoria>/ (formato .mp4) e cadastre no
   campo "audio".

4. LOGO: salve como logo.png em assets/logo/.

=====================================================================
6. COMO ADICIONAR UMA COLEÇÃO NOVA
=====================================================================

1. Crie js/dados/NOME.js com: const NOME = [ ... ];
2. Acrescente "...NOME" na lista do js/dados/geral.js.
3. Acrescente <script src="js/dados/NOME.js"></script> no index.html e no
   obra.html, ANTES da linha do geral.js.
4. Se a coleção terá uma seção própria na home: crie a <section> e a <div> de
   cards no index.html (ids "grid-..."), um link no <nav> e a regra
   correspondente no home.js.

ORDEM DOS <script> (index.html e obra.html):
   pinturas.js, esculturas.js, fotografias.js, bustos.js, geral.js e, por
   último, home.js (no index.html) ou obra.js (no obra.html).
   O geral.js precisa vir depois das coleções, e o home.js/obra.js depois do
   geral.js.

=====================================================================
7. CUIDADOS (erros mais comuns)
=====================================================================

- Os caminhos escritos no código precisam ser IDÊNTICOS aos arquivos reais
  (pasta, nome e extensão). Uma letra diferente (ex: gonzalez x gonzales)
  gera imagem quebrada.
- Falta de vírgula entre blocos, ou aspas/colchetes fora do lugar, quebram o
  arquivo inteiro: nenhuma obra daquela coleção aparece.
- Um id repetido faz a página abrir sempre a primeira obra com aquele id.
- No GitHub Pages, maiúsculas e minúsculas contam: foto.JPG e foto.jpg são
  arquivos diferentes. Evite espaços e acentos nos nomes de arquivos.
- Para descobrir o que está errado: abra o site, aperte F12, aba Console
  (erros em vermelho) e aba Network (arquivos com 404).
