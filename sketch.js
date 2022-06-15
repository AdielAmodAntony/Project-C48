var penguin, penguinImg;
var backgroundImg;
var bg;
var iceberg, icebergImg;
var invisibleGround;
var gameState = "start";
var icebergGroup;
var restart, restartImg;
var gameOver, gameOverImg;
var score = 0;

function preload () {
  backgroundImg = loadImage ("images/bg.png");
  penguinImg = loadAnimation ("images/penguin-1.png","images/penguin-2.png");
  icebergImg = loadImage ("images/iceberg.png");
  endImg = loadAnimation ("images/penguin-1.png");
  gameOverImg = loadImage ("images/game-over.png");
  restartImg = loadImage ("images/restart.png");
}

function setup() {
  createCanvas(1000,700);
  
  bg = createSprite (500, 350);
  bg.addImage (backgroundImg);
  bg.scale = 2.6;
 

  penguin = createSprite(150, 350);
  penguin.addAnimation ("swimming", penguinImg);
  penguin.addAnimation ("end", endImg);
  penguin.scale = 0.5;
  penguin.setCollider ("rectangle", 0, 0, 350, 140);

  invisibleGround = createSprite (500, 690, 1000, 10);
  invisibleGround.visible = false;

  icebergGroup = createGroup ();

  gameOver = createSprite (500, 280);
  gameOver.addImage (gameOverImg);
  gameOver.scale = 0.4;

  restart = createSprite (500, 400);
  restart.addImage (restartImg);
  restart.scale = 0.2;

}

function draw() {
  background(215);
  if (gameState === "start") {
    text ("Press Space to begin!", 450, 350);   
    gameOver.visible = false;
    restart.visible = false;
  }

  if (keyDown (32) && gameState === "start") {
    gameState = "play";
  }

  if (gameState === "play") {
    gameOver.visible = false;
    restart.visible = false;
    bg.velocityX = -1.5;
    if (bg.x < 0) {
      bg.x = 500;
    }

  if (keyDown (32) && penguin.y >= 100) {
    penguin.velocityY = -10;
  }

  score += Math.round(getFrameRate ()/60);
  console.log (score);
  

  penguin.velocityY += 0.8;

  spawnIcebergs1 ();
  spawnIcebergs2 ();
  if (icebergGroup.isTouching (penguin)) {
    gameState = "end";
  }  
}
 if (gameState === "end") {
  gameOver.visible = true;
  restart.visible = true;
  bg.velocityX = 0;
  icebergGroup.setVelocityXEach (0);
  penguin.velocityY = 0;
  penguin.changeAnimation ("end");
  textSize (35);
  fill ("yellow");
  text ("GAME OVER !!!!!", 480, 350);
  icebergGroup.setLifetimeEach (-1);
 }

 if (mousePressedOver (restart)) {
   reset ();
 }
 
 penguin.collide (invisibleGround);
  drawSprites ();
}

function spawnIcebergs1 () {
if (frameCount % 100 === 0) {
iceberg = createSprite (1000, Math.round(random (650, 700)));
iceberg.addImage (icebergImg);
iceberg.velocityX = -6;
iceberg.scale = 0.8;
iceberg.setCollider("rectangle", 0, 0, 140, 470);

icebergGroup.add (iceberg);
iceberg.lifetime = 1000;
}
}

function spawnIcebergs2 () {
  if (frameCount % 100 === 0) {
  iceberg = createSprite (1000, Math.round(random (120, 20)));
  iceberg.addImage (icebergImg);
  iceberg.velocityX = -6;
  iceberg.scale = 0.8;
  iceberg.setCollider("rectangle", 0, 0, 140, 470);

  icebergGroup.add (iceberg);
  iceberg.lifetime = 1000;
  }
  }

  function reset () {
    gameState = "start"
    icebergGroup.destroyEach ();
    penguin.changeAnimation ("swimming");
    penguin.y  = 350;
    score = 0;
  }