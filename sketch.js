var jogador
var imgsJogador = []
var inimigo
var imgsInimigo = []
var bg
var fase = 1
var grupoInimigos
var imgs = []
var grupoTiroJ,imgsTiroJ = []
var estadoJogo = 1
var vidas = 3
var imgsVida= [];
var vidaI
var grupoTiroI,imgsTiroI = [];

function preload() {
  
  imgsJogador[0] = loadImage("image/jogador1.png"); 
  imgsJogador[1] = loadImage("image/jogador2.png");
  imgsJogador[2] = loadImage("image/jogador3.png");

  imgsTiroJ[0] = loadImage("image/tiroJ1.png");
  imgsTiroJ[1] = loadImage("image/tiroJ2.png");
  imgsTiroJ[2] = loadImage("image/tiroJ3.png");

  imgs[0] = loadImage("image/background1.jpg"); 
  imgs[1] = loadImage("image/background2.jpg");
  imgs[2] = loadImage("image/background3.jpg");

  imgsInimigo[0] = loadImage("image/inimigo1.png");
  imgsInimigo[1] = loadImage("image/inimigo2.png");
  imgsInimigo[2] = loadImage("image/inimigo3.png");

  imgsVida[0] = loadImage("image/vida3.png");
  imgsVida[1] = loadImage("image/vida2.png");
  imgsVida[2] = loadImage("image/vida1.png");

  imgsTiroI[0] = loadImage("image/tiroI1.png");
  imgsTiroI[1] = loadImage("image/tiroI2.png");
  imgsTiroI[2] = loadImage("image/tiroI3.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(200,200,100,100);
  bg.velocityX = -4;
  mudarBg();

  jogador = createSprite(100,windowHeight/2,50,50);
  mudarNave();

  vidaI = createSprite(width-100,50,50,50);
  mudarVida();

  grupoTiroJ = new Group();
  grupoInimigos = new Group();
  grupoTiroI = new Group();
}

function draw() {
  background(0);
   
  if(estadoJogo == 1){
    if(keyDown("up") ){
      jogador.y = jogador.y  -4;
    }
  
    if(keyDown("down") ){
      jogador.y = jogador.y  +4;
    }

    if(bg.x < -60){
      bg.x = bg.width/8
    }
  
    if(keyDown("space") && frameCount%10 == 0){
      gerarTirosJ();
    }

    var indexInimigo = Math.round(random(1,3)) 
    if(frameCount%200 === 0){
      gerarInimigo(indexInimigo);
    }

    grupoInimigos.overlap(jogador,colisao);

    grupoInimigos.overlap(grupoTiroJ,colisaoT);

    if(vidas == 0 ){
      estadoJogo = 0
    }
  
  }else if(estadoJogo == 0){

  }else if(estadoJogo == 2){

  }


  drawSprites();
}
function mudarBg(){
  bg.addImage(imgs[fase - 1]);
  
}
function mudarNave(){
  jogador.addImage(imgsJogador[fase-1]);  
}

function gerarInimigo(index){
  var inimigo = createSprite(windowWidth+10,Math.round(random(150,windowHeight-40)),50,50);
  // if(inimigo.x > 0){
  //     setInterval(function(){
        var tiroI = createSprite(inimigo.x - 30,inimigo.y,50,50);
        tiroI.velocityX = -4
        tiroI.addImage(imgsTiroI[index-1]);
        tiroI.lifetime = 1000;
  //     }, 1000);
  // }
  inimigo.velocityX = -3
  inimigo.addImage(imgsInimigo[index-1]);
  inimigo.lifetime = 1000;
  inimigo.vidas = 3;


  grupoInimigos.add(inimigo);
  grupoTiroI.add(tiroI);
}

function gerarTirosJ(){
  var tiro = createSprite(130,jogador.y,50,50);
  tiro.addImage(imgsTiroJ[fase-1]);
  tiro.velocityX = 5
  tiro.lifetime = 1000;
  grupoTiroJ.add(tiro);
}

function mudarVida(){
  
  vidaI.addImage(imgsVida[vidas-1])
}

function colisao(spriteA, spriteB){
  spriteA.destroy();
  vidas--;
  mudarVida();
}

function colisaoT(spriteA,spriteB){
  spriteB.destroy(); 
  spriteA.vidas--;
  if(spriteA.vidas === 0){
    spriteA.destroy();
  }

}

