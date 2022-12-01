<template>
  <h1>ggggg</h1>
  <hr />

  <div class="grid">
    <canvas ref="board" class="board"></canvas>
    <div class="right-column">
      <div>
        <h1>TETRIS</h1>
        <p>Score: <span id="score">0</span></p>
        <p>Lines: <span id="lines">0</span></p>
        <p>Level: <span id="level">0</span></p>
        <canvas id="next" class="next"></canvas>
      </div>
      <button @click="play" class="play-button">Play</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { shapeArray } from '../utils/block.js';
// @ts-ignore
import Board from '../utils/Board.js';
// @ts-ignore
import Piece from '../utils/Piece';
import { ref, onMounted } from 'vue';
const ROW = 20;
const COL = 10; // field size
const BLOCK_SIZE = 30;

let field = new Array(ROW);

enum KEY {
  LEFT = 37,
  RIGHT = 39,
  DOWN = 40,
}
for (let i = 0; i < ROW; i++) {
  field[i] = new Array(COL).fill(0);
}
const board = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;
onMounted(async () => {
  ctx = board?.value!.getContext('2d')!;

  ctx.canvas.width = COL * BLOCK_SIZE;
  ctx.canvas.height = ROW * BLOCK_SIZE;

  // 블록의 크기를 변경한다.
  ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
});

const play = () => {
  console.log('play');
  console.log(ROW, COL);
  const board = new Board(ROW, COL);
  board.reset();
  let piece = new Piece(ctx);
  piece.draw();

  board.piece = piece;
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Press Start 2P', cursive;
}

.grid {
  display: grid;
  grid-template-columns: 320px 200px;
}

.right-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.board {
  border: solid 2px;
}

.play-button {
  background-color: #4caf50;
  font-size: 16px;
  padding: 15px 30px;
  cursor: pointer;
}
.field {
  margin: auto;
  td {
    width: 20px;
    height: 20px;
  }
}
</style>
