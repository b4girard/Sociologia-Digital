document.addEventListener('DOMContentLoaded', () => {
    const gridPinturas = document.getElementById('grid-pinturas');
    const gridEsculturas = document.getElementById('grid-esculturas');
    const gridFotografias = document.getElementById('grid-fotografias');
    const gridBustos = document.getElementById('grid-bustos');
    const gridMulheres = document.getElementById('grid-mulheres');

    function criarCard(obra) {
        return `
            <a href="obra.html?id=${obra.id}" class="card-obra">
                <img src="${obra.imagem}" alt="${obra.titulo}" onerror="this.src='https://via.placeholder.com/300x200?text=${obra.titulo}'">
                <div class="card-info">
                    <h3>${obra.titulo}</h3>
                    <p>${obra.autor || obra.subtitulo || ''}</p>
                </div>
            </a>
        `;
    }

    geral.forEach(obra => {
        const cardHtml = criarCard(obra);

        // Jeito antigo: um valor só em "tipo"
        if (obra.tipo === 'pintura') {
            gridPinturas.innerHTML += cardHtml;
        } else if (obra.tipo === 'escultura') {
            gridEsculturas.innerHTML += cardHtml;
        } else if (obra.tipo === 'fotografia') {
            gridFotografias.innerHTML += cardHtml;
        }

        // Jeito novo: uma lista em "secoes". Cada "if" é independente,
        // por isso a mesma pessoa pode cair nas duas seções.
        if (obra.secoes && obra.secoes.includes('busto')) {
            gridBustos.innerHTML += cardHtml;
        }
        if (obra.secoes && obra.secoes.includes('mulheres_nas_ciencias')) {
            gridMulheres.innerHTML += cardHtml;
        }
    });
});