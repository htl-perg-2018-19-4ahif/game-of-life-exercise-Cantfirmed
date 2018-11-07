window.onload = () => {
  const boardSize = 200;
  let board = generateBoard(boardSize);
  let neighbours = 0;
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  initiallyAlive();


  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);

  function generateBoard(boardSize: number) {
    return new Array(boardSize).fill(false).map(() => new Array(boardSize).fill(false));
  };


  function draw() {
    // Demo code showing how to draw in the canvas
    ctx.clearRect(0, 0, boardSize * 4, boardSize * 4);
    for (;;) {
      for (let i = 0; i < boardSize; i++) {
        for (let k = 0; k < boardSize; k++) {
          if (board[i][k] == 1) {
            ctx.fillRect(i * 4, k * 4, 4, 4);
          }
        }
      }
      window.requestAnimationFrame(draw);
      setInterval(stayingAlive, 100);
    }
  }

  function initiallyAlive() {
    let i_alive = (boardSize * boardSize) * 0.03;
    for (let i = 0; i < boardSize; i++) {
      for (let k = 0; k < boardSize; k++) {
        board[i][k] = 0;
      }
    }
    for (let i = 0; i < i_alive; i++) {
      let x = Math.floor(Math.random() * 200);
      let y = Math.floor(Math.random() * 200);
      if (board[x][y] != 1) {
        board[x][y] = 1;
      } else {
        i--;
      }
    }
  }

  function stayingAlive() {
    for (let i = 0; i < boardSize; i++) {
      for (let k = 0; k < boardSize; k++) {
        neighbours = getNeighbours(i, k);
        if (board[i][k] == 1) {
          if (neighbours < 2) {
            board[i][k] = 0;
          }
          if (neighbours == 2 || neighbours == 3) {
            board[i][k] = 1;
          }
          if (neighbours > 3) {
            board[i][k] = 0;
          }
        }
        if (neighbours == 3 && board[i][k] == 0) {
          board[i][k] = 1;
        }
      }
    }
    draw();
  }
  function getNeighbours(x: number, y: number) {
    neighbours = 0;
    const xChecks: number[] = [x - 1, x, x + 1];
    const yChecks: number[] = [y - 1, y, y + 1];

    for (const xCheck of xChecks) {
      for (const yCheck of yChecks) {
        neighbours += (!(xCheck === x && yCheck === y) && board[xCheck] && board[xCheck][yCheck]) ? 1 : 0;
      }
    }

    return neighbours;
  }
};