document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const obraId = params.get('id');

    const obra = geral.find(o => o.id === obraId);

    if (!obra) {
        document.body.innerHTML = '<h1>Obra não encontrada</h1><a href="index.html">Voltar para Home</a>';
        return;
    }

    document.title = `${obra.titulo} - Sociologia Digital`;
    document.getElementById('obra-titulo').textContent = obra.titulo;

    // Preenche um texto e mostra o bloco; se o valor não existir, esconde o bloco.
    function mostrarSeTiver(valor, idTexto, idBloco) {
        const bloco = document.getElementById(idBloco);
        if (valor) {
            document.getElementById(idTexto).textContent = valor;
            bloco.hidden = false;
        } else {
            bloco.hidden = true;
        }
    }

    mostrarSeTiver(obra.autor, 'obra-autor', 'item-autor');
    mostrarSeTiver(obra.ano, 'obra-ano', 'item-ano');
    mostrarSeTiver(obra.tecnica, 'obra-tecnica', 'item-tecnica');
    // Descrição: se a obra tem "descricaoArquivo", lê o .txt desse caminho.
    // Senão, usa o texto do campo "descricaoVisual" (obras ainda não migradas).
    async function carregarDescricao() {
        if (!obra.descricaoVisual) {
            mostrarSeTiver(obra.descricaoVisual, 'obra-descricao-visual', 'bloco-descricao');
            return;
        }
        try {
            const resposta = await fetch(obra.descricaoVisual);
            if (!resposta.ok) throw new Error('arquivo não encontrado');
            const texto = await resposta.text();
            document.getElementById('obra-descricao-visual').textContent = texto;
            document.getElementById('bloco-descricao').hidden = false;
        } catch (erro) {
            document.getElementById('bloco-descricao').hidden = true;
        }
    }
    carregarDescricao();
    carregarDescricao();
    mostrarSeTiver(obra.biografia, 'obra-biografia', 'bloco-biografia');
    mostrarSeTiver(obra.frase, 'obra-frase', 'bloco-frase');

    // Se não tem autor, ano nem técnica, esconde a caixa amarela inteira
    document.getElementById('bloco-info').hidden = !(obra.autor || obra.ano || obra.tecnica);

    const blocoImpressao = document.getElementById('bloco-impressao');
    if (obra.fotoImpressao) {
        const imgImpressao = document.getElementById('obra-impressao');
        imgImpressao.src = obra.fotoImpressao;
        imgImpressao.alt = `Impressão 3D do busto de ${obra.titulo}`;
        blocoImpressao.hidden = false;
    }

    const imgElement = document.getElementById('obra-imagem');
    imgElement.src = obra.imagem;
    imgElement.alt = obra.titulo;
    imgElement.onerror = function() {
        this.src = `https://via.placeholder.com/800x600?text=${obra.titulo}`;
    };

    const audioPlayer = document.getElementById('audio-player');
    const btnAudio = document.getElementById('btn-play-audio');

    // Sem áudio cadastrado: esconde o botão e para por aqui
    if (!obra.audio) {
        btnAudio.hidden = true;
        return;
    }

    audioPlayer.src = obra.audio;

    // Lógica do botão de áudio
    btnAudio.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            btnAudio.innerHTML = '<span>⏸ Pausar Audiodescrição</span>';
        } else {
            audioPlayer.pause();
            btnAudio.innerHTML = '<span>▶ Ouvir Audiodescrição</span>';
        }
    });

    audioPlayer.onended = () => {
        btnAudio.innerHTML = '<span>▶ Ouvir Audiodescrição</span>';
    };
});