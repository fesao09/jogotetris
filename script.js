document.addEventListener('DOMContentLoaded', () => {
    // Configurações iniciais
    const canvas = document.getElementById('canvasTetris');
    const contexto = canvas.getContext('2d');
    canvas.width = 300; // 10 colunas de peças (cada uma de 30px)
    canvas.height = 600; // 20 linhas de peças (cada uma de 30px)
    const COLUNAS = 10;
    const LINHAS = 20;
    const TAMANHO_BLOCO = 30;
    const cores = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800'];

    // Tabela para o tabuleiro de jogo
    let tabuleiro = Array.from({ length: LINHAS }, () => Array(COLUNAS).fill(null));
    let pecaAtual = obterPecaAleatoria();
    let jogoAtivo = false;
    let intervaloQueda;
    let pontuacao = 0;
    const pontuacaoDisplay = document.getElementById('pontuacaoDisplay');

    // Funções de controle de botões
    document.getElementById('iniciarButton').addEventListener('click', () => {
        if (!jogoAtivo) {
            jogoAtivo = true;
            intervaloQueda = setInterval(() => {
                moverPecaParaBaixo();
            }, 1000);
        }
    });

    document.getElementById('pausarButton').addEventListener('click', () => {
        if (jogoAtivo) {
            clearInterval(intervaloQueda);
            jogoAtivo = false;
        }
    });

    document.getElementById('salvarButton').addEventListener('click', () => {
        alert("Função de salvar ainda não implementada.");
    });

    // Função para obter uma peça aleatória
    function obterPecaAleatoria() {
        const tetrominoes = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[0, 1, 1], [1, 1, 0]], // S
            [[1, 1, 0], [0, 1, 1]], // Z
            [[1, 1, 1], [0, 1, 0]], // T
            [[1, 1, 1], [1, 0, 0]], // L
            [[1, 1, 1], [0, 0, 1]] // J
        ];
        const forma = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
        return {
            forma,
            cor: cores[Math.floor(Math.random() * cores.length)],
            x: Math.floor((COLUNAS - forma[0].length) / 2),
            y: 0
        };
    }

    // Função para desenhar o tabuleiro
    function desenharTabuleiro() {
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        for (let linha = 0; linha < LINHAS; linha++) {
            for (let coluna = 0; coluna < COLUNAS; coluna++) {
                if (tabuleiro[linha][coluna]) {
                    contexto.fillStyle = tabuleiro[linha][coluna];
                    contexto.fillRect(coluna * TAMANHO_BLOCO, linha * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);
                    contexto.strokeStyle = '#000';
                    contexto.strokeRect(coluna * TAMANHO_BLOCO, linha * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);
                }
            }
        }
        desenharPecaAtual();
    }

    // Função para desenhar a peça atual
    function desenharPecaAtual() {
        contexto.fillStyle = pecaAtual.cor;
        pecaAtual.forma.forEach((linha, y) => {
            linha.forEach((valor, x) => {
                if (valor) {
                    contexto.fillRect(
                        (pecaAtual.x + x) * TAMANHO_BLOCO,
                        (pecaAtual.y + y) * TAMANHO_BLOCO,
                        TAMANHO_BLOCO,
                        TAMANHO_BLOCO
                    );
                    contexto.strokeStyle = '#000';
                    contexto.strokeRect(
                        (pecaAtual.x + x) * TAMANHO_BLOCO,
                        (pecaAtual.y + y) * TAMANHO_BLOCO,
                        TAMANHO_BLOCO,
                        TAMANHO_BLOCO
                    );
                }
            });
        });
    }

    // Função para mover a peça para baixo
    function moverPecaParaBaixo() {
        pecaAtual.y++;
        if (colidiu()) {
            pecaAtual.y--;
            fixarPeca();
            pecaAtual = obterPecaAleatoria();
            if (colidiu()) {
                alert('Game Over');
                jogoAtivo = false;
                clearInterval(intervaloQueda);
                reiniciarJogo();
            }
        }
        removerLinhasCompletas();
        desenharTabuleiro();
    }

    // Função para mover a peça para a esquerda
    function moverPecaParaEsquerda() {
        pecaAtual.x--;
        if (colidiu()) {
            pecaAtual.x++;
        }
        desenharTabuleiro();
    }

    // Função para mover a peça para a direita
    function moverPecaParaDireita() {
        pecaAtual.x++;
        if (colidiu()) {
            pecaAtual.x--;
        }
        desenharTabuleiro();
    }

    // Função para rotacionar a peça
    function rotacionarPeca() {
        const novaForma = pecaAtual.forma[0].map((_, i) =>
            pecaAtual.forma.map(linha => linha[i]).reverse()
        );
        const formaAntiga = pecaAtual.forma;
        pecaAtual.forma = novaForma;
        if (colidiu()) {
            pecaAtual.forma = formaAntiga;
        }
        desenharTabuleiro();
    }

    // Função para verificar se a peça colidiu com o tabuleiro ou outra peça
    function colidiu() {
        for (let y = 0; y < pecaAtual.forma.length; y++) {
            for (let x = 0; x < pecaAtual.forma[y].length; x++) {
                if (
                    pecaAtual.forma[y][x] &&
                    (tabuleiro[pecaAtual.y + y] && tabuleiro[pecaAtual.y + y][pecaAtual.x + x]) !== null ||
                    pecaAtual.y + y >= LINHAS ||
                    pecaAtual.x + x < 0 ||
                    pecaAtual.x + x >= COLUNAS
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    // Função para fixar a peça no tabuleiro quando ela colide
    function fixarPeca() {
        pecaAtual.forma.forEach((linha, y) => {
            linha.forEach((valor, x) => {
                if (valor) {
                    tabuleiro[pecaAtual.y + y][pecaAtual.x + x] = pecaAtual.cor;
                }
            });
        });
    }

    // Função para remover linhas completas
    function removerLinhasCompletas() {
        for (let linha = LINHAS - 1; linha >= 0; linha--) {
            if (tabuleiro[linha].every(celula => celula !== null)) {
                // A linha está cheia, então removemos ela
                tabuleiro.splice(linha, 1);
                tabuleiro.unshift(Array(COLUNAS).fill(null));
                pontuacao += 100; // Aumenta a pontuação por linha removida
                pontuacaoDisplay.textContent = pontuacao;
            }
        }
    }

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        tabuleiro = Array.from({ length: LINHAS }, () => Array(COLUNAS).fill(null));
        pecaAtual = obterPecaAleatoria();
        pontuacao = 0;
        pontuacaoDisplay.textContent = pontuacao;
        desenharTabuleiro();
    }

    // Função para lidar com os controles do teclado
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'ArrowLeft') {
            moverPecaParaEsquerda();
        } else if (evento.key === 'ArrowRight') {
            moverPecaParaDireita();
        } else if (evento.key === 'ArrowDown') {
            moverPecaParaBaixo();
        } else if (evento.key === 'ArrowUp') {
            rotacionarPeca();
        }
    });

});
