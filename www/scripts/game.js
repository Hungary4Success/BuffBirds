/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

let isRightBirds;
let birdPositionsX;
let birdPositionsY;
let birdVelocitiesX;
let birdVelocitiesY;
let birdVelocityXMean;
let birdVelocityXSTD;
let birdVelocityYMean;
let birdVelocityYSTD;
let leftBirdSprite;
let rightBirdSprite;
let backgroundImage;
let startBirdNumber;
let crosshairImage;
let canvasWidth;
let canvasHeight;
let thrownShakers;
let shakerSprite;
let originalShakerW;
let originalShakerH;

function Ammo(targetX, targetY, posX, posY, scale) {
  this.targetX = targetX;
  this.targetY = targetY;
  this.positionX = posX;
  this.positionY = posY;
  this.scale = scale;
}

function getCanvasDimensions() {
  return { width: 800, height: 500 };
}

function preload() {
  leftBirdSprite = loadGif('./res/images/leftbird.gif');
  rightBirdSprite = loadGif('./res/images/rightbird.gif');
  backgroundImage = loadImage('./res/images/background.png');
  shakerSprite = loadImage('./res/images/shaker.jpg');
  crosshairImage = loadImage('./res/images/crosshair.png');
}

function setup() {
  const { width, height } = getCanvasDimensions();
  const canvas = createCanvas(width, height);
  canvas.parent('container');
  noCursor();
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
  originalShakerW = shakerSprite.width;
  originalShakerH = shakerSprite.height;
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);

  for (let index = 0; index < birdPositionsX.length; index++) {
    if (isRightBirds[index]) {
      image(rightBirdSprite, birdPositionsX[index], birdPositionsY[index]);
    } else {
      image(leftBirdSprite, birdPositionsX[index], birdPositionsY[index]);
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
  image(crosshairImage, mouseX - 25, mouseY - 25, 50, 50);

  if (thrownShakers.length > 0) {
    let newShakerSprite = JSON.parse(JSON.stringify(shakerSprite));
    for (let shaker = 0; shaker < thrownShakers.length; shaker++) {
      const current = thrownShakers[shaker];
      if (
        abs(current.positionX - current.targetX) < 2 &&
        abs(current.positionY - current.targetY) < 2) {
        thrownShakers.splice(shaker, 1);
        console.log('at position');
      } // if
      newShakerSprite.resize(originalShakerW * current.scale, originalShakerH * current.scale);
      image(newShakerSprite, current.positionX, current.positionY);

      const speed = 0.01;
      const xDist = current.targetX - width / 2;
      const yDist = current.targetY - height;
      current.positionX += xDist * speed;
      current.positionY += yDist * speed;
      current.scale -= 0.005;
      console.log(current.scale);
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
    thrownShakers.push(new Ammo(mouseX, mouseY, width / 2, height, 1.0));
  }
}

function getMouseAngle() {
  if (mouseX > 0 && mouseX < 800 && mouseY > 0 && mouseY < 500) {
    return atan((mouseX - 400) / (height - mouseY)) * 180 / Math.PI;
  }

  return 'Mouse out of bounds';
}
