const botaoPlayPause = document.getElementById('play-pause');
const botaoAvancar = document.getElementById('proximo');
const botaoVoltar = document.getElementById('anterior');
const nomeCapitulo = document.getElementById('capitulo');

const barraTempoContainer = document.getElementById('barra-tempo-container');
const barraTempo = document.getElementById('barra-tempo');
const audioCapitulo = document.getElementById('audio-capitulo');



const numeroCapitulos = 10;
let taTocando = 0;
let capituloAtual = 1;
let arrastando = false;

function ajustarTempo(evento) {
    const larguraTotal = barraTempoContainer.clientWidth;
    const posicaoX = evento.clientX - barraTempoContainer.getBoundingClientRect().left;
    const porcentagem = (posicaoX / larguraTotal) * 100;

    barraTempo.style.width = porcentagem + '%';

    const novoTempo = (porcentagem / 100) * audioCapitulo.duration;
    audioCapitulo.currentTime = novoTempo;
}

function atualizarBarraTempo() {
    const porcentagem = (audioCapitulo.currentTime / audioCapitulo.duration) * 100;
    barraTempo.style.width = porcentagem + '%';
}

barraTempoContainer.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', ajustarTempo);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', ajustarTempo);
    });
});

function tocarFaixa() {
    audioCapitulo.play();
    botaoPlayPause.classList.remove('bi-play-circle-fill');
    botaoPlayPause.classList.add('bi-pause-circle-fill');
}

function pausarFaixa() {
    audioCapitulo.pause();
    botaoPlayPause.classList.add('bi-play-circle-fill');
    botaoPlayPause.classList.remove('bi-pause-circle-fill');
}

function tocarOuPausar() {
    if (taTocando === 0) {
        tocarFaixa();
        taTocando = 1;
    } else {
        pausarFaixa();
        taTocando = 0;
    }
}

function trocarNomeFaixa() {
    nomeCapitulo.innerText = 'Capítulo ' + capituloAtual;
}

function atualizarBarraTempo() {
    const percentConcluido = (audioCapitulo.currentTime / audioCapitulo.duration) * 100;
    barraTempo.style.width = percentConcluido + '%';
}

function proximaFaixa() {
    if (capituloAtual === numeroCapitulos) {
        capituloAtual = 1;
    } else {
        capituloAtual = capituloAtual + 1;
    }

    audioCapitulo.src = './books/dom-casmurro/' + capituloAtual + '.mp3';
    tocarFaixa();
    taTocando = 1;
    trocarNomeFaixa();
}

function voltarFaixa() {
    if (capituloAtual === 1) {
        capituloAtual = numeroCapitulos;
    } else {
        capituloAtual = capituloAtual - 1;
    }

    audioCapitulo.src = './books/dom-casmurro/' + capituloAtual + '.mp3';
    tocarFaixa();
    taTocando = 1;
    trocarNomeFaixa();
}

botaoPlayPause.addEventListener('click', tocarOuPausar);
botaoAvancar.addEventListener('click', proximaFaixa);
botaoVoltar.addEventListener('click',  voltarFaixa);
audioCapitulo.addEventListener('timeupdate', atualizarBarraTempo);

