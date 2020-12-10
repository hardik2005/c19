var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score ;
var ground;
var backgr,backgrImage;

function preload() {

  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  backgrImage = loadImage("jungle.jpg");

}



function setup() {
    createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backgrImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
 ground = createSprite(400,350,800,10);
 ground.velocityX = -4;
 ground.x = ground.width/2;
 ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;

}


function draw() {
  
  food();
  obstacles();
  
  if (backgr.x < 100){ 
  backgr.x = backgr.width/2;
  }
  
   if (ground.x < 0){
      ground.x = ground.width/2;
 } 
  
  if(foodGroup.isTouching(monkey)){
  score=score+2;
  foodGroup.destroyEach(monkey);
  
      switch(score){
      case 10 : monkey.scale = 0.12;
      break;
      case 20 : monkey.scale = 0.14;
      break;  
      case 30 : monkey.scale = 0.16;
      break;      
      case 40 : monkey.scale = 0.18;
      break;
      default: break;   
  }

}
  
 if(keyDown("space") && monkey.y > 300){
 monkey.velocityY = -15;  
 
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
 if(obstacleGroup.isTouching(monkey)){ 
  monkey.scale=0.08;
}
 
  drawSprites();
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score,500,50);
}

 function food(){
  if (frameCount % 120 === 0){
  banana = createSprite(600,250,40,10);
  banana.y = Math.round(random(180,280));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 300;
  foodGroup.add(banana);
}
}

function obstacles(){
  if (frameCount % 220 === 0){
  obstacle = createSprite(800,350,10,40);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -5;  
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
}
}