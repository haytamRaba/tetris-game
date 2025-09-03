const cvs=document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const Row = 20;
const Col =10;
const sq=sqaureSize=20;
const Vacant = "WHITE";
let board = [];

const PIECES =[
  [Z ,"red"],
  [S,"green"],
  [T,"yellow"],
  [O,"blue"],
  [L,"purple"],
  [I,"cyan"],
  [J,"orange"]
]
//DRAWING A SQUARE;
function drawSquare(left,top,color){

      ctx.fillStyle=color;
      ctx.fillRect( left*sq ,top*sq ,sq ,sq )

      ctx.strokeStyle="BLACK";
      ctx.strokeRect( left*sq , top*sq , sq , sq )
}
//Board
function drawBoard(){

  for( r = 0 ; r < Row ; r++ ){

  for( c = 0 ; c < Col ; c++){

    drawSquare(c,r,Vacant);
  }
}
}

drawBoard();

let P = new  Piece( PIECES[0][0] , PIECES[0][1] );
//tetromino
function Piece( tetromino , color ){
 this.tetromino=tetromino;
 this.color=color;
 this.tetrominoNumber=0;
 this.activeTetromino=this.tetromino[ this.tetrominoNumber ];

 this.x=3;
 this.y=0;
}
// draw a piece 
Piece.prototype.draw = function(){

 for( r = 0 ; r < this.activeTetromino.length ; r++ ){

  for( c = 0 ; c < this.activeTetromino.length  ; c++){

    if( this.activeTetromino[r][c] )
      drawSquare( this.x +c , this.y +r , this.color );
  }
}
}
//undraw a piece 
Piece.prototype.undraw = function(){

 for( r = 0 ; r < this.activeTetromino.length ; r++ ){

  for( c = 0 ; c < this.activeTetromino.length  ; c++){

    if( this.activeTetromino[r][c] )
      drawSquare( this.x +c , this.y +r , Vacant );
  }
}
}
P.draw();
// mOVE DOWN 
Piece.prototype.moveDown=function(){
if(!this.collision(0,1,this.activeTetromino))
{
  this.undraw();
  this.y++
  this.draw();
}else{

}


}
Piece.prototype.moveRight=function(){
  if(!this.collision(1,0,this.activeTetromino)){
  this.undraw();
  this.x++;
  this.draw();
  }
 
}
Piece.prototype.moveLeft=function(){
  if(!this.collision(-1,0,this.activeTetromino))
  {
  this.undraw();
  this.x--;
  this.draw();
  }

}

Piece.prototype.rotate=function(){
  let nextPatt =this.tetromino[(this.tetrominoNumber+1)%this.tetromino.length];
  if(!this.collision(0,0,nextPatt))
  {
  this.undraw();
  this.tetrominoNumber=(this.tetrominoNumber+1)%this.tetromino.length;
  this.activeTetromino=this.tetromino[this.tetrominoNumber];
  this.draw();
  }
  
}
//control piece
document.addEventListener("keydown",CONTROL);
function CONTROL(event) {
  if (event.key === "ArrowLeft") {
    P.moveLeft();
    dropStart=Date.now();
  } else if (event.key === "ArrowUp") {
    P.rotate();
    dropStart=Date.now();
  } else if (event.key === "ArrowRight") {
    P.moveRight();
    dropStart=Date.now();
  } else if (event.key === "ArrowDown") {
    P.moveDown();
  }
}






let dropStart = Date.now();

// lhodod
Piece.prototype.collision=function(x,y,piece){
    for( r = 0 ; r < piece.length ; r++ ){

  for( c = 0 ; c < piece.length ; c++){
// if the square is empty 
// skip 
      if(!piecec[r][c]){
        continue;
      }
      let newX = this.x + c + x;
      let newY = this.y + r + y ;

      if( newX < 0 || newX >= Col || newY >= Row ){
        return true;
      }
      if (newY < 0 ){
        continue;
      }
      if(board[newY][newX] != Vacant ){
        return true;
       }
     }
 }
return false;
}
function drop(){
  let now = Date.now();
  let diffTime =now-dropStart;
  if ( diffTime > 1000 ){
    P.moveDown();
   
    
    dropStart=Date.now();
  }
  requestAnimationFrame(drop);

}
drop();
