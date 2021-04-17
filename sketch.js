
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var comet;
var tail;
var starbody;
var star

function preload() {

  starImg = loadImage("star.png");
  fairyImg = loadAnimation("f1.png", "f2.png");
  comet_tail = loadAnimation("g1.png", "g2.png", "g3.png", "g4.png", "g5.png", "g6.png", "g7.png", "g8.png", "g9.png");
  comet_body = loadAnimation("r1.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fairy = createSprite(width/4,520);
  fairy.addAnimation("fairyflying", fairyImg);
  fairy.scale = 0.25;

  star = createSprite(width-100, 30);
  star.addImage(starImg);
  star.scale = 0.05;

  comet = createSprite(width, 200, 1, 1);
  comet.addAnimation("falling", comet_body);
  comet.scale = 0.03;
  comet.velocityX = -15;
  comet.velocityY = 2;
  comet.lifetime = 200;

  tail = createSprite(width + 50, 200, 1, 1);
  tail.addAnimation("falling", comet_tail);
  tail.x = comet.x + 40;
  tail.scale = 0.2;
  tail.velocityX = -15;
  tail.velocityY = 2;
  tail.lifetime = 200;

  engine = Engine.create();
  world = engine.world;

  starBody = Bodies.circle(width-100, 30, 5, { restitution: 0, isStatic: true });
  World.add(world, starBody);

  Engine.run(engine);
}

function draw() {
  background(0, 0, 55);
  star.x = starBody.position.x
  star.y = starBody.position.y

  if (star.y > 470 && starBody.position.y > 470) {
    Matter.Body.setStatic(starBody, true);
  }

  keyPressed();
  starSpawn();
  drawSprites();
}

function starSpawn() {
  if (frameCount % 1 === 0) {
    var star1 = createSprite(Math.round(random(0, width)), Math.round(random(0, height)), 20, 20);
    star1.addImage(starImg);
    star1.scale = random(0.005, 0.001)
    star1.lifetime = 600;
  }
}

function keyPressed() {
  if (keyWentDown("right")) {
    fairy.velocityX = 5;
  }

  if (keyWentDown("left")) {
    fairy.velocityX = -5;
  }
  if (fairy.x>width-220) {
    Matter.Body.setStatic(starBody, false);
    star.x = width-100;
    fairy.x = width-220;
    fairy.velocityX = 0;
  }
}