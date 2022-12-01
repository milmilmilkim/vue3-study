class Board {
  grid;
  ROW;
  COL;

  constructor(ROW, COL) {
    this.ROW = ROW;
    this.COL = COL;
  }

  // 새 게임이 시작되면 보드를 초기화한다.
  reset() {
    this.grid = this.getEmptyBoard();
  }

  // 0으로 채워진 행렬을 얻는다.
  getEmptyBoard() {
    return Array.from({ length: this.ROW }, () => Array(this.COL).fill(0));
  }
}

export default Board;
