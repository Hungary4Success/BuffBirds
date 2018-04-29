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
    translate(width / 2, height + 20);
    rotate(mouseAngle);
    image(shakerSprite, -75 / 2, -130, 75, 170);
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

  if (thrownShakers.length > 0) {
    let newShakerSprite = shakerSprite.get();
    for (let shaker = 0; shaker < thrownShakers.length; shaker++) {
      const current = thrownShakers[shaker];
      if (
        abs((current.positionX + shakerSprite.width * current.scale / 2) - current.targetX) < shakerSprite.width * current.scale / 2 &&
        abs(current.positionY - current.targetY) < shakerSprite.height * current.scale / 8) {
        for (let index = 0; index < birdPositionsX.length; index++) {
          if (collideRectRect(current.positionX, current.positionY, current.scale * shakerSprite.width, current.scale * shakerSprite.height, birdPositionsX[index], birdPositionsY[index], leftBirdSprite.width, leftBirdSprite.height)) {
            console.log('hit!');
            score++;
          }
        }
        thrownShakers.splice(shaker, 1);
        console.log('at position');
      } // if
      newShakerSprite.resize(shakerSprite.width * current.scale, shakerSprite.height * current.scale);
      image(newShakerSprite, current.positionX, current.positionY);

      const speed = 0.06;
      const xDist = (current.targetX - shakerSprite.width / 8) - (width / 2 - (shakerSprite.width / 4));
      const yDist = current.targetY - height;
      current.positionX += xDist * speed;
      current.positionY += yDist * speed;
      current.scale -= 0.01;
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
  if (angle !== 'Mouse out of bounds' && shakerCount > 0) {
    thrownShakers.push(new Ammo(mouseX, mouseY, width / 2 - (shakerSprite.width / 4), height, 0.5));
  }
  if (shakerCount === 0) {
    shakerCount = 8;
    score = 0;
  } else {
    shakerCount--;
  }

  console.log(getMouseAngle());
}

function getMouseAngle() {
  if (mouseX > 0 && mouseX < 800 && mouseY > 0 && mouseY < 500) {
    return atan((mouseX - 400) / (height - mouseY));
  }

  return 'Mouse out of bounds';
}
