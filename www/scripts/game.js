/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

let isRightBirds;
let birdPositionsX;
let birdPositionsY;

let anchorX;
let anchorY;

let birdVelocitiesX;
let birdVelocitiesY;
let birdVelocityXMean;
let birdVelocityXSTD;
let birdVelocityYMean;
let birdVelocityYSTD;

let leftBirdSprite;
let leftBirdSpriteImage;
let rightBirdSprite;
let rightBirdSpriteImage;
let backgroundImage;
let crosshairImage;

let font;

let canvasWidth;
let canvasHeight;
let thrownShakers;
let shakerSprite;
let mouseAngle;

const level = 0;

let startBirdNumber;
let score = 0;
let shakerCount = 7;

function Ammo(targetX, targetY, scale, angle) {
  this.targetY = targetY;
  this.positionY = 0;
  this.scale = scale;
  this.angle = angle;
}

function getCanvasDimensions() {
  return { width: 800, height: 500 };
}

function preload() {
  crosshairImage = loadImage('./res/images/crosshair.png');
  if (level === 0) {
    leftBirdSprite = loadGif('./res/images/leftbird.gif');
    rightBirdSprite = loadGif('./res/images/rightbird.gif');
    rightBirdSpriteImage = loadImage('./res/images/rightbird.gif');
    leftBirdSpriteImage = loadImage('./res/images/leftbird.gif');

    backgroundImage = loadImage('./res/images/background.png');
    shakerSprite = loadImage('./res/images/shaker.png');
    font = loadFont('./res/fonts/SFPixelate.ttf');
  } else if (level === 1) {
    leftBirdSprite = loadGif('./res/images/leftbird.gif');
    rightBirdSprite = loadGif('./res/images/rightbird.gif');
    rightBirdSpriteImage = loadImage('./res/images/rightbird.gif');
    leftBirdSpriteImage = loadImage('./res/images/leftbird.gif');

    backgroundImage = loadImage('./res/images/background.png');
    shakerSprite = loadImage('./res/images/shaker.png');
    font = loadFont('./res/fonts/SFPixelate.ttf');
  }
}

function setup() {
  const { width, height } = getCanvasDimensions();
  const canvas = createCanvas(width, height);
  canvas.parent('container');

  noCursor();
  anchorX = width / 2;
  anchorY = height;

  birdVelocityXMean = 0.1;
  birdVelocityXSTD = birdVelocityXMean - 0.00001;
  birdVelocityYMean = 0;
  birdVelocityYSTD = 0.2;

  startBirdNumber = 2;
  isRightBirds = [startBirdNumber];
  birdPositionsX = [startBirdNumber];
  birdPositionsX = [startBirdNumber];
  birdPositionsY = [startBirdNumber];
  birdVelocitiesX = [startBirdNumber];
  birdVelocitiesY = [startBirdNumber];
  thrownShakers = [];

  for (let index = 0; index < startBirdNumber; index++) {
    if (random(0, 100) < 50) {
      isRightBirds[index] = true;
    } else {
      isRightBirds[index] = false;
    }

    birdPositionsY[index] = randomGaussian(height / 2, height / 4);
    if (birdPositionsY[index] > height * 0.7) {
      birdPositionsY[index] = height * 0.6;
    }

    birdPositionsX[index] = width + 10;
    birdVelocitiesX[index] = randomGaussian(birdVelocityXMean, birdVelocityXSTD);
    birdVelocitiesY[index] = randomGaussian(birdVelocityYMean, birdVelocityYSTD);
  } // for index
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);

  if (shakerCount <= 0) {
    // Draw end screen
    textSize(60);
    text('GAME OVER', 215, 225);
    textSize(50);
    text(`SCORE: ${score}`, 285, 300);
  } else {
    // Draw score
    textSize(32);
    textFont(font);
    text(`SCORE: ${score}`, 15, 50);

    // Draw current shaker
    push();
    translate(anchorX, anchorY);
    rotate(mouseAngle);
    image(shakerSprite, -75 / 2, -60, 75, 170);
    pop();
  }

  // Draw available shakers
  const startPositionX = 750;
  for (let i = 0; i < shakerCount; i++) {
    const positionX = startPositionX - i * 30;
    image(shakerSprite, positionX, 15, 25, 50);
  }

  // Draw birds
  for (let index = 0; index < birdPositionsX.length; index++) {
    if (rightBirdSprite.loaded()) {
      if (isRightBirds[index]) {
        image(rightBirdSprite, birdPositionsX[index], birdPositionsY[index]);
      } else {
        image(leftBirdSprite, birdPositionsX[index], birdPositionsY[index]);
      }
    } else if (isRightBirds[index]) {
      image(rightBirdSpriteImage, birdPositionsX[index], birdPositionsY[index]);
    } else {
      image(leftBirdSpriteImage, birdPositionsX[index], birdPositionsY[index]);
    }


    if (isRightBirds[index]) {
      birdPositionsX[index] -= birdVelocitiesX[index];
    } else {
      birdPositionsX[index] += birdVelocitiesX[index];
    }
    birdPositionsY[index] += birdVelocitiesY[index];

    birdVelocitiesX[index] += randomGaussian(birdVelocityXMean, birdVelocityXSTD);
    birdVelocitiesY[index] += randomGaussian(birdVelocityYMean, birdVelocityYSTD);

    if (isRightBirds[index] && birdPositionsX[index] < -leftBirdSprite.width) {
      birdPositionsX[index] = width + rightBirdSprite.width;
      birdVelocitiesX[index] = 0;
      birdVelocitiesY[index] = 0;
    } else if (!isRightBirds[index] && birdPositionsX[index] > width) {
      birdPositionsX[index] = -leftBirdSprite.width - 10;
      birdVelocitiesX[index] = 0;
      birdVelocitiesY[index] = 0;
    }
    if (birdPositionsY[index] > height * 0.65) {
      birdPositionsY[index] = height * 0.65;
    } else if (birdPositionsY[index] < 0) {
      birdPositionsY[index] = 0;
    }
  }

  if (getMouseAngle() !== 'Mouse out of bounds') {
    mouseAngle = getMouseAngle();
  }

  image(crosshairImage, mouseX - 25, mouseY - 25, 50, 50);

  // Draw flying shakers
  if (thrownShakers.length > 0) {
    const speed = 20;
    for (let shaker = 0; shaker < thrownShakers.length; shaker++) {
      const newShakerSprite = shakerSprite.get();
      const current = thrownShakers[shaker];
      newShakerSprite.resize(shakerSprite.width * current.scale, shakerSprite.height * current.scale);
      if (abs((current.positionY + newShakerSprite.height / 2) - current.targetY) < speed) {
        thrownShakers.splice(shaker, 1);
        console.log('At cross');
      }
      push();
      translate(anchorX, anchorY);
      rotate(current.angle);
      image(newShakerSprite, -75 / 2, current.positionY);
      pop();

      current.positionY -= speed;
      current.scale -= 0.01;
    }
  }
} // for index

function windowResized() {
  // put code here that needs to run in the beginning once
  const { width, height } = getCanvasDimensions();
  resizeCanvas(width, height);
}

function mouseClicked() {
  const angle = getMouseAngle();
  if (angle !== 'Mouse out of bounds') {
    thrownShakers.push(new Ammo(0, -dist(anchorX, anchorY, mouseX, mouseY), 0.5, angle));
  }
  score++;
  if (shakerCount === 0) {
    shakerCount = 8;
    score = 0;
  } else {
    score++;
    shakerCount--;
  }
}

function getMouseAngle() {
  if (mouseX > 0 && mouseX < 800 && mouseY > 0 && mouseY < 500) {
    return atan((mouseX - 400) / (height - mouseY));
  }

  return 'Mouse out of bounds';
}
