var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg; 
var gameState = "play"
var inv_groundGroup,inv_ground


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  ghostImg1 = loadAnimation("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,30,30)
  ghost.addAnimation("ghost",ghostImg1)
  ghost.addAnimation("ghost1",ghostImg)
  ghost.scale = 0.3
  doorsGroup = createGroup()
  climbersGroup = createGroup()
  inv_groundGroup = createGroup()
  //ghost.debug = true
  ghost.setCollider("rectangle",0,0,150,150)
}

function draw() {
  background(0);
  if(gameState === "play"){
spookySound.play()
ghost.changeAnimation("ghost",ghostImg1)
  if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 3
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 3
  }
  if(keyDown("SPACE")){
    ghost.velocityY = -10
  }
  ghost.velocityY = ghost.velocityY + 1
  SpawnDoors()
  if(climbersGroup.isTouching(ghost)){
    ghost.changeAnimation("ghost1",ghostImg)
    ghost.velocityY = 0
    
  }
  if(ghost.y >600 || inv_groundGroup.isTouching(ghost)){
    gameState = "end"
  }
  drawSprites()
}
if(gameState === "end"){
  textSize(25)
  fill("yellow")
  text("GAME OVER!!!!!!", 240,300) 
  spookySound.stop()
}
}
function SpawnDoors(){
  if(frameCount%240 ===0){
    door = createSprite(200,-50)
    climber = createSprite(200,10)
    inv_ground = createSprite(200,15)
    inv_ground.width = climber.width
    inv_ground.height = 2
    door.x = Math.round(random(120,400))
    climber.x = door.x
    inv_ground.x = door.x 
    door.velocityY = tower.velocityY 
    climber.velocityY = tower.velocityY 
    inv_ground.velocityY = tower.velocityY 
    door.addImage("door1",doorImg)
    climber.addImage("climber",climberImg)
    door.depth = ghost.depth
    ghost.depth += 1
    door.lifetime = 700
    climber.lifetime = 700
    inv_ground.lifetime = 700
    inv_ground.debug = true
    climbersGroup.add(climber)
    doorsGroup.add(door)
    inv_groundGroup.add(inv_ground)
    inv_ground.visible = false;
  }
}