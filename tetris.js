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


function drawBoard(){

  for( r = 0 ; r < Row ; r++ ){

  for( c = 0 ; c < Col ; c++){

    drawSquare(c,r,Vacant);
  }
}
}
drawBoard();

let P = new  Piece( PIECES[0][0] , PIECES[0][1] );

function Piece( tetromino , color ){
 this.tetromino=tetromino;
 this.color=color;
 this.tetrominoNumber=0;
 this.activeTetromino=this.tetromino[ this.tetrominoNumber ];

 this.x=0;
 this.y=0;
}

Piece.prototype.draw = function(){

 for( r = 0 ; r < this.activeTetromino.length ; r++ ){

  for( c = 0 ; c < this.activeTetromino.length  ; c++){

    if( this.activeTetromino[r][c] )
      drawSquare( this.x +c , this.y +r , this.color );
  }
}
}
P.draw();