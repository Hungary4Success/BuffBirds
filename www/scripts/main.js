/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  console.log('Script started!');
}

var canvasWidth;
var canvasHeight;
let birdPositionsX;
let birdPositionsY;
let birdVelocitiesX;
let birdVelocitiesY;
let birdVelocityXMean;
let birdVelocityXSTD;
let birdVelocityYMean;
let birdVelocityYSTD;
let backgroundImage;
let birdNumber;

function setup() {
  canvasWidth = windowWidth / 2;
  canvasHeight = windowHeight / 2;
  createCanvas(canvasWidth, canvasHeight);
  backgroundImage = loadImage('./res/images/background.png');
  birdVelocityXMean = 0.1;
  birdVelocityXSTD = birdVelocityXMean - 0.00001;
  birdVelocityYMean = 0;
  birdVelocityYSTD = 0.5;
  birdNumber = 2;
  birdPositionsX = [birdNumber];
  birdPositionsX = [birdNumber];
  birdPositionsY = [birdNumber];
  birdVelocitiesX = [birdNumber];
  birdVelocitiesY = [birdNumber];

  for (let index = 0; index < birdNumber; index++) {
    birdPositionsY[index] = randomGaussian(height / 2, height / 4);
    birdPositionsX[index] = -10;
    birdVelocitiesX[index] = randomGaussian(birdVelocityXMean, birdVelocityXSTD);
    birdVelocitiesY[index] = randomGaussian(birdVelocityYMean, birdVelocityYSTD);    
  }
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);
  ellipse(mouseX, mouseY, 50, 50);
  let radius = 50;

  for (let index = 0; index < birdPositionsX.length; index++) {
    ellipse(birdPositionsX[index], birdPositionsY[index], radius);

    birdPositionsX[index] += birdVelocitiesX[index];
    birdPositionsY[index] += birdVelocitiesY[index];

    birdVelocitiesX[index] += randomGaussian(birdVelocityXMean, birdVelocityXSTD);
    birdVelocitiesY[index] += randomGaussian(birdVelocityYMean, birdVelocityYSTD);

    if (birdPositionsX[index] > width) {
      birdPositionsX[index] = -10;
      birdVelocitiesX[index] = 0;
      birdVelocitiesY[index] = 0;
    }
    if (birdPositionsY[index] > height - (radius / 2))
      birdPositionsY[index] = height - (radius / 2);
    else if (birdPositionsY[index] < radius / 2)
      birdPositionsY[index] = radius / 2;
  }
}

function windowResized() {
  // put code here that needs to run in the beginning once
  canvasWidth = windowWidth / 2;
  canvasHeight = windowHeight / 2;
  resizeCanvas(canvasWidth, canvasHeight);
}

function onMouseClick() {

}
