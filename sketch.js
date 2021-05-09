var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup, obstacleGroup;

var survivalTime;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);

  monkey=createSprite(50,150,20,20);
  monkey.addAnimation("Monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,390,700,20);
  ground.shapeColor="green";
  ground.velocityX=-4;
  
  obstacleGroup=new Group();
  bananaGroup=new Group();
  
  survivalTime=0;
}

function draw() {
  background("lightblue");
  
  stroke("black");
  textSize(20);
  fill("blue");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime "+survivalTime,50,50);
  
  if(monkey.isTouching(obstacleGroup)){
  ground.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0;
  }    
  
  if (ground.x < 250){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")) {
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.6;
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    survivalTime=survivalTime+5;
  }
  
  spawnBanana();
  spawnObstacle();

 drawSprites();
}
function spawnBanana(){
   if (frameCount % 80 === 0){
   var banana = createSprite(600,100,10,40);
   banana.y = Math.round(random(150,190));
   banana.velocityX = -3;
   banana.addImage(bananaImage);
   banana.lifetime=200;
   banana.scale=0.1;
   bananaGroup.add(banana);

    }
  }
function spawnObstacle(){
   if (frameCount % 300 === 0){
   var obstacle=createSprite(600,375,10,40);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
   obstacle.lifeTime=400;
   obstacle.scale=0.1;
   obstacleGroup.add(obstacle);
    }
  }
switch(survivalTime){
  case 10:monkey.scale=0.12;
          break;
  case 20:monkey.scale=0.14;
          break;
  case 30:monkey.scale=0.16;
          break;
  case 40:monkey.scale=0.18;
          break;
          
}