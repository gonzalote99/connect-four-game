const ground = document.getElementById('ground');
const player = document.getElementById('player');
let places;


const lenCol= 7, lenRow = 6;

let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

let validClickedCount = 0;

const all = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (d !== 0);

const gameWinOverCommon = () => {
  places.forEach(i => i.removeEventListener('click', clickedPlace));
  player.parentElement.remove();
}

const gameOver = () => {
  gameWinOverCommon();
  document.getElementById('title').innerText = `game over`;
};

const gameWin = (player, a, b, c, d) => {
  gameWinOverCommon();

  let _a = a[0] * lenCol + a[1];
  let _b = b[0] * lenCol + b[1];
  let _c = c[0] * lenCol + c[1];
  let _d = d[0] * lenCol + d[1];

  [_a, _b, _c, _d].forEach(i => places[i].style.backgroundColor = "#ffffff");

  document.getElementById('title').innerText = `player ${player} won`;
}


const checkForWin = () => {
  for(let r = 0; r <lenRow; r++) {
    for(let c = 0; c<lenCol-3; c++ ) {
      if(all(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3] )) {
        gameWin(board[r][c], [r, c] [r,c+1], [r, c+2], [r , c+3]);
        return;
      };
    };
  };

  for(let r=0; r<lenRow-3; r++ ) {
    for(let c = 0; c < lenCol; c++) {
      if(all(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c] )) {
        gameWin(board[r][c], [r, c], [r+1, c], [r+2, c], [r+3, c]);
        return;
      };
    };
  };

  for(let r=0; r<lenRow-3; r++) {
    for(let c=0; c<lenCol-3; c++) {
      if(all(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3])) {
        gameWin(board[r][c], [r, c], [r+1, c+1], [r+2, c+2], [r+3, c+3]);
        return;
      };
    };
  };


  for(let r=3; r < lenRow; r++) {
    for(let c = 0; c < lenCol-3; c++) {
      if(all(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3])) {
        gameWin(board[r][c], [r, c], [r-1, c+1], [r-2, c+2], [r-3, c+3]);
        return;
      };
    };
  };

  validClickedCount += 1;
  if(validClickedCount === (lenCol * lenRow)) {gameOver()};




};


const clickedPlace = (e) => {
let col = e.target.getAttribute('data-id') %lenCol;

if(board[lenRow-1][col] === 0) {
  let row;
  for(let r=0; r < lenRow; r++) {
    if(board[r][col] === 0) {row = r; break}
  };
  if(typeof(row) === "number") {
    board[row][col] = player.innerText;
    places[row*lenCol+col].style.backgroundColor = (player.innerText === 'X') ? "#ff0000": "#0000ff";
    checkForWin();
    player.innerText = (player.innerText === 'X') ? 'Y': 'X';
  };
};
};


const createBoard = () => {
  for(let i = 0; i <lenCol*lenRow; i++ ) {ground.innerHTML += `<div class="place" data-id="${i}"></div>`};
  places = [...document.getElementsByClassName('place')];
  places.forEach(i => i.addEventListener('click', clickedPlace));

};


const startGame = () => {
  createBoard();
}

startGame();