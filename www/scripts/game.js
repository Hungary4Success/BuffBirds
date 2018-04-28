/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  console.log('Script started!');
}

let birdPositionsX;
let birdPositionsY;
let birdVelocitiesX;
let birdVelocitiesY;
let birdVelocityXMean;
let birdVelocityXSTD;
let birdVelocityYMean;
let birdVelocityYSTD;
let birdSprite;
let backgroundImage;
let startBirdNumber;
let crosshairImage;
let canvasWidth;
let canvasHeight;

function getCanvasDimensions() {
  return { width: 800, height: 500 };
}

function preload() {
  birdSprite = loadGif('./res/images/bird.gif');
}

function setup() {
  const { width, height } = getCanvasDimensions();
  const canvas = createCanvas(width, height);
  canvas.parent('container');
  noCursor();
  backgroundImage = loadImage('./res/images/background.png');
  birdVelocityXMean = 0.1;
  birdVelocityXSTD = birdVelocityXMean - 0.00001;
  birdVelocityYMean = 0;
  birdVelocityYSTD = 0.2;
  startBirdNumber = 2;
  birdPositionsX = [startBirdNumber];
  birdPositionsX = [startBirdNumber];
  birdPositionsY = [startBirdNumber];
  birdVelocitiesX = [startBirdNumber];
  birdVelocitiesY = [startBirdNumber];

  for (let index = 0; index < startBirdNumber; index++) {
    birdPositionsY[index] = randomGaussian(height / 2, height / 4);
    if (birdPositionsY[index] > height * 0.7) {
      birdPositionsY[index] = height * 0.6;
    }
    birdPositionsX[index] = width + 10;
    birdVelocitiesX[index] = randomGaussian(birdVelocityXMean, birdVelocityXSTD);
    birdVelocitiesY[index] = randomGaussian(birdVelocityYMean, birdVelocityYSTD);
  }
  crosshairImage = loadImage('./res/images/crosshair.png');
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);

  for (let index = 0; index < birdPositionsX.length; index++) {
    image(birdSprite, birdPositionsX[index], birdPositionsY[index]);

    birdPositionsX[index] -= birdVelocitiesX[index];
    birdPositionsY[index] += birdVelocitiesY[index];

    birdVelocitiesX[index] += randomGaussian(birdVelocityXMean, birdVelocityXSTD);
    birdVelocitiesY[index] += randomGaussian(birdVelocityYMean, birdVelocityYSTD);

    if (birdPositionsX[index] < -birdSprite.width) {
      birdPositionsX[index] = width + 10;
      birdVelocitiesX[index] = 0;
      birdVelocitiesY[index] = 0;
    }
    if (birdPositionsY[index] > height * 0.7) {
      birdPositionsY[index] = height * 0.7;
    } else if (birdPositionsY[index] < 0) {
      birdPositionsY[index] = 0;
    }
  }
  image(crosshairImage, mouseX - 25, mouseY - 25, 50, 50);
}

function windowResized() {
  // put code here that needs to run in the beginning once
  const { width, height } = getCanvasDimensions();
  resizeCanvas(width, height);
}

function onMouseClick() {

}
