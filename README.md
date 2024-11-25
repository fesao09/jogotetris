# Tetris - Jogo em JavaScript

Este é um projeto de Tetris, desenvolvido com HTML, CSS e JavaScript, com algumas funcionalidades adicionais, como controle de pontuação, movimentação de peças, rotação, e controle do jogo via botões. A ideia é criar uma versão simples, porém funcional, de Tetris que pode ser jogada em navegadores tanto em dispositivos móveis quanto em desktops.

## Funcionalidades

- **Controle de Jogo:** Botões para iniciar, pausar, e salvar o progresso do jogo.
- **Pontuação:** A pontuação aparece na parte superior da tela e é incrementada quando uma linha é completada.
- **Movimentação:** As peças podem ser movidas para a esquerda, direita e para baixo, além de poderem ser rotacionadas.
- **Game Over:** O jogo termina quando as peças atingem o topo do tabuleiro.
- **Design Responsivo:** Funciona tanto em dispositivos móveis quanto em desktops.
- **Peças Aleatórias:** As peças são geradas aleatoriamente a partir dos tetrominoes clássicos.

## Como Jogar

- **Iniciar:** Clique no botão "Iniciar" para começar o jogo.
- **Pausar:** Clique no botão "Pausar" para interromper o jogo.
- **Salvar:** O botão "Salvar" atualmente apenas exibe uma mensagem informando que a função ainda não foi implementada.
- **Movimentos:**
  - **Seta para a esquerda:** Move a peça para a esquerda.
  - **Seta para a direita:** Move a peça para a direita.
  - **Seta para baixo:** Acelera a queda da peça.
  - **Seta para cima:** Rotaciona a peça.

## Arquivos

O projeto consiste em três arquivos principais:

1. **index.html:** Contém a estrutura básica do HTML com o tabuleiro de jogo e os botões de controle.
2. **styles.css:** Responsável pela estilização do jogo, incluindo o layout e a aparência das peças.
3. **script.js:** Contém toda a lógica do jogo, desde a movimentação das peças até o controle da pontuação e a detecção de colisões.

## Estrutura de Diretórios

```plaintext
tetris-project/
│
├── index.html
├── styles.css
└── script.js
