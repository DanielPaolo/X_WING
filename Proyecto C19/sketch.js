var x_wing, x_wingImg;
var tie, tiesGroup, tieImg;
var space, spaceImg;
var pnt_ext, pnt_extImg, pnt_extGroup;
var mina, minaImg, minaGroup;
var blue_shot, blue_shotImg, blue_shotGroup;
var gameState = 1;
var play = 1;
var end = 0;
var score = 0;

function preload(){
x_wingImg = loadImage("x-wing.png");
spaceImg = loadImage("space.webp");
tieImg = loadImage("TIEfighter.webp");
pnt_extImg = loadImage("blue_T.png");
minaImg = loadImage("red_T.png");
blue_shotImg = loadImage("laser_azul.webp");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 
 space = createSprite(width/2,200);
 space.addImage(spaceImg);
 space.scale = 7;
 space.velocityX = -4;
 

x_wing = createSprite(200,300);
x_wing.addImage(x_wingImg);
x_wing.scale = 0.3;

score = 0;
tiesGroup = new Goroup();
pnt_extGroup = new Group();
minaGroup = new Group();

createShot();
tiefighter();
puntoExtra();
minas();
}

function draw(){
    background(200);

if(gameState === play){
   
  if(keyDown("up_arrow")){
      x_wing.position.y = x_wing.position.y +3;
  }
  if(keyDown("down_arrow")){
      x_wing.position.y = x_wing.position.y -3;
  }

 if(space.x > height ){
    space.x = height/2;
    }
  if(tiesGroup.isTouching(x_wing)){
      x_wing.destroy();
      gameState = end;
  }
  if(minaGroup.isTouching(x_wing)){
     score = score-7;
  }
  if(keyDown("space")){
      createShot();
  }
  var select_item = Math.round(random(1,3));
  if(World.framecountt % 100 == 0){
      if(select_item == 1){
          tiefighter();
      } else if(select_item == 2){
          puntoExtra();
      } 
      else{
          minas();
      }
  }
  if(blue_shotGroup.isTouching(tie)){
      tie.destroyEach();
  }
  if(pnt_extGroup.isTouching(x_wing)){
pnt_extGroup.destroyEach();
score = score + 10;
  }
}
if(gameState === end){
text("Game Over Pilot",300,300);
textSize(20);
}
if(score > 1000){
    x_wing.destroy;
    text("You Win Pilot",300,300);
    textSize(20);
}
    drawSprites();
    text("Score:" + score, 300,50);
}
function createShot(){
blue_shot = createSprite(100,100,60,10);
blue_shot.x = 360;
blue_shot.y = x_wing.y;
blue_shot.velocityX = 4;
blue_shot.lifetime = 100;
blue_shot.scale = 0.3;
blue_shotGroup.add(blue_shot);
}

function tiefighter(){
    tie = createSprite(0,Math.round(random(20,370)),10,10);
    tie.addImage(tieImg);
    tie.velocityX = -3;
    tie.lifetime = 150;
    tie.scale = 0.3;
    tiesGroup.add(tie);
}

function puntoExtra(){
    pnt_ext = createSprite(0,Math.round(random(20,370)),10,10);
    pnt_ext.addImage(pnt_extImg);
    pnt_ext.velocityX = -1;
    pnt_ext.lifetime = 50;
    pnt_ext.scale = 0.2;
    pnt_extGroup.add(pnt_ext);
}

function minas(){
    mina = createSprite(0,Math.round(random(20,370)),10,10);
    mina.addImage(minaImg);
    mina.velocityX = -5;
    mina.lifetime = 150;
    mina.scale = 0.2;
    minaGroup.add(mina);
}