// Simple Tetris implementation — single-file, no frameworks

const COLS = 10;
const ROWS = 20;
const BLOCK = 24; // pixel size
const LINES_PER_LEVEL = 10;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
canvas.width = COLS * BLOCK;
canvas.height = ROWS * BLOCK;

const nextCanvas = document.getElementById('next');
const nctx = nextCanvas.getContext('2d');

const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const linesEl = document.getElementById('lines');

const COLORS = [
  null,
  '#FFB86B',
  '#FF5252',
  '#7C4DFF',
  '#00E5FF',
  '#69F0AE',
  '#FFD54F',
  '#FF80AB'
];

const SHAPES = [
  [],
  [[1,1,1,1]],               // I
  [[2,2],[2,2]],             // O
  [[0,3,0],[3,3,3]],         // T
  [[4,4,0],[0,4,4]],         // S
  [[0,5,5],[5,5,0]],         // Z
  [[6,0,0],[6,6,6]],         // L
  [[0,0,7],[7,7,7]]          // J
];

function createMatrix(w,h){
  const m = [];
  while(h--) m.push(new Array(w).fill(0));
  return m;
}

function drawMatrix(matrix, offset, context = ctx, cellSize = BLOCK){
  matrix.forEach((row,y)=>{
    row.forEach((value,x)=>{
      if(value){
        context.fillStyle = COLORS[value];
        context.fillRect((x+offset.x)*cellSize, (y+offset.y)*cellSize, cellSize-1, cellSize-1);
      }
    });
  });
}

function rotate(matrix){
  // transpose + reverse
  for(let y=0;y<matrix.length;y++){
    for(let x=0;x<y;x++){
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }
  matrix.forEach(row => row.reverse());
  return matrix;
}

function collide(arena, player){
  const m = player.matrix;
  for(let y=0;y<m.length;y++){
    for(let x=0;x<m[y].length;x++){
      if(m[y][x] &&
         (arena[y + player.pos.y] &&
          arena[y + player.pos.y][x + player.pos.x]) !== 0){
            return true;
      }
    }
  }
  return false;
}

function merge(arena, player){
  player.matrix.forEach((row,y)=>{
    row.forEach((value,x)=>{
      if(value) arena[y + player.pos.y][x + player.pos.x] = value;
    });
  });
}

function sweep(){
  let rowCount = 0;
  outer: for(let y = arena.length -1; y>=0; y--){
    for(let x=0;x<arena[y].length;x++){
      if(arena[y][x] === 0) continue outer;
    }
    const row = arena.splice(y,1)[0].fill(0);
    arena.unshift(row);
    y++;
    rowCount++;
  }
  if(rowCount>0){
    lines += rowCount;
    score += (rowCount===1?40:rowCount===2?100:rowCount===3?300:1200) * level;
    while(lines >= level*LINES_PER_LEVEL){ level++; }
    updateScore();
  }
}

function updateScore(){
  scoreEl.textContent = score;
  levelEl.textContent = level;
  linesEl.textContent = lines;
}

let arena = createMatrix(COLS, ROWS);

function randomPiece(){
  const id = Math.floor(Math.random()* (SHAPES.length-1)) + 1;
  const shapeDef = SHAPES[id];
  return shapeDef.map(row => row.slice());
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let score = 0;
let level = 1;
let lines = 0;

const player = {
  pos: {x: 3, y: 0},
  matrix: randomPiece()
};

let nextPiece = randomPiece();

function playerReset(){
  player.matrix = nextPiece;
  nextPiece = randomPiece();
  player.pos.y = 0;
  player.pos.x = Math.floor((COLS - player.matrix[0].length)/2);
  if(collide(arena, player)){
    arena.forEach(row => row.fill(0));
    score = 0;
    level = 1;
    lines = 0;
    updateScore();
  }
}

function playerDrop(){
  player.pos.y++;
  if(collide(arena, player)){
    player.pos.y--;
    merge(arena, player);
    sweep();
    playerReset();
  }
  dropCounter = 0;
}

function playerMove(dir){
  player.pos.x += dir;
  if(collide(arena, player)) player.pos.x -= dir;
}

function playerRotate(dir){
  const pos = player.pos.x;
  rotate(player.matrix);
  if(collide(arena, player)){
    // simple wall kick
    player.pos.x += dir;
    if(collide(arena, player)){
      rotate(player.matrix); rotate(player.matrix); rotate(player.matrix); // rotate back
      player.pos.x = pos;
    }
  }
}

function hardDrop(){
  while(!collide(arena, player)){
    player.pos.y++;
  }
  player.pos.y--;
  merge(arena, player);
  sweep();
  playerReset();
}

function draw(){
  ctx.fillStyle = '#0f1724';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  drawMatrix(arena, {x:0,y:0});
  drawMatrix(player.matrix, player.pos);
  // draw next
  nctx.fillStyle = '#0f1724';
  nctx.fillRect(0,0,nextCanvas.width,nextCanvas.height);
  drawMatrix(nextPiece, {x:0,y:0}, nctx, BLOCK/3);
}

function update(time=0){
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  dropInterval = Math.max(1000 - (level-1)*100, 150);
  if(dropCounter > dropInterval) playerDrop();
  draw();
  requestAnimationFrame(update);
}

document.getElementById('start').addEventListener('click', ()=>{
  arena = createMatrix(COLS, ROWS);
  score = 0; level = 1; lines = 0;
  playerReset();
  updateScore();
});

document.getElementById('pause').addEventListener('click', ()=>{
  // naive pause: stop animation loop by cancel animationFrame? simpler to reload
  alert('Refresh page to unpause (simple client).');
});

document.addEventListener('keydown', event=>{
  if(event.key === 'ArrowLeft') playerMove(-1);
  else if(event.key === 'ArrowRight') playerMove(1);
  else if(event.key === 'ArrowDown') playerDrop();
  else if(event.key === 'z' || event.key === 'Z') playerRotate(-1);
  else if(event.key === 'x' || event.key === 'X' || event.key === 'ArrowUp') playerRotate(1);
  else if(event.code === 'Space') { event.preventDefault(); hardDrop(); }
});

playerReset();
updateScore();
update();
