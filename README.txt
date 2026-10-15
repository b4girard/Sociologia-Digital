INSTRUÇÕES DE ORGANIZAÇÃO - PROJETO SOCIOLOGIA DIGITAL

Este projeto foi estruturado para ser um portfólio estático (HTML, CSS, JS) otimizado para dispositivos móveis e acesso via QR Code.

ESTRUTURA DE PASTAS:
/SociologiaDigital
│
├── index.html          (Página Inicial)
├── obra.html           (Página de Detalhes Dinâmica)
│
├── css/                (Arquivos de Estilo)
│   ├── style.css       (Global)
│   ├── home.css        (Home)
│   └── obra.css        (Detalhes)
│
├── js/                 (Lógica do Site)
│   ├── obras.js        (BANCO DE DADOS - Edite aqui as informações)
│   ├── home.js
│   └── obra.js
│
└── assets/             (Arquivos de Mídia)
    ├── logo/           (Coloque aqui o arquivo 'logo.png')
    ├── imagens/        (Coloque aqui as fotos das obras)
    ├── audio/          (Coloque aqui os arquivos .mp4 de audiodescrição)
    └── icons/          (Ícones adicionais, se houver)

PROCEDIMENTO PARA ADICIONAR MÍDIAS:
1. IMAGENS: Salve as imagens na pasta 'assets/imagens/'. 
   Os nomes dos arquivos devem ser exatamente os que estão no arquivo 'js/obras.js' (ex: operarios.jpg, artesao.jpg).
   Formatos recomendados: .jpg ou .png.

2. ÁUDIOS: Salve os arquivos de audiodescrição na pasta 'assets/audio/'.
   O código está configurado para ler arquivos .mp4 conforme solicitado.
   Nomes sugeridos: operarios.mp4, artesao.mp4, etc.

3. LOGO: Salve sua logo como 'logo.png' dentro de 'assets/logo/'.

COMO EDITAR AS INFORMAÇÕES:
Se precisar alterar o autor, ano ou descrição de alguma obra, abra o arquivo 'js/obras.js'.
Cada obra tem um bloco de código como este:
{
    id: "exemplo",
    titulo: "Título",
    autor: "Autor",
    ano: "Ano",
    tecnica: "Técnica",
    descricaoVisual: "Texto da descrição...",
    imagem: "caminho/da/imagem.jpg",
    audio: "caminho/do/audio.mp4"
}
Basta alterar o texto entre as aspas.

OBSERVAÇÃO SOBRE O QR CODE:
O site é responsivo. Ao gerar o QR Code, aponte para a URL onde o arquivo 'index.html' estiver hospedado.
