//creating the variables sprites,groups and images/animations
var monkey, monkey_running;
var ground, invisibleGround;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
//variable for score
var score = 0;

function preload() {

  //an animation to show that the monkey is running
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600)
  monkey = createSprite(100, 550, 20, 20)
  monkey.addAnimation("monkey running", monkey_running)
  monkey.scale = 0.2
  ground = createSprite(300, 580, 600, 20)
  ground.shapeColor = "green";
  //invisible ground helps to show that the monkey is walking on the ground
  invisibleGround = createSprite(0, 590, 600, 10)
  invisibleGround.visible = false;
  FoodGroup = createGroup();
  ObstaclesGroup = createGroup();
}


function draw() {

  //console.info("This is the "+frameCount+" frame count")
  background("skyblue");
  //displaying the score
  fill("magenta");
  textSize = 50;
  score = Math.round(frameCount / 20)
  text("Survival Time=" + score, 300, 100);

  drawSprites();
  //functions for spawning bananas and obstacles
  Operation_Hungry()
  Operation_trouble()
  //Important to keep the monkey from falling below the ground
  monkey.collide(invisibleGround)
  //depth is used to show the monkey in front of the ground
  monkey.depth = 10;
  //making the ground infinite. 
  ground.velocityX = 5
  ground.x = ground.width / 2
  //when space key pressed and monkey is not too up monkey has to jump
  if (keyDown("space") && monkey.y > 100) {
    monkey.velocityY = -20;

  }
  //so that when the monkey jumps it also comes back
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8
}

function Operation_Hungry() {
  if (frameCount % 80 === 0) {
    var rand = Math.round(random(120, 200))
    banana = createSprite(600, 250, 20, 20);
    banana.addImage("bananas flying", bananaImage)
    banana.scale = 0.1
    //for the banana to appear in random positions
    banana.y = rand
    banana.velocityX = -7
    //to avoide memory leak
    banana.lifetime = 120
    FoodGroup.add(banana)
  }
}

function Operation_trouble() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 550, 20, 20);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2

    obstacle.velocityX = -7;
    obstacle.lifetime = 120

  }
}