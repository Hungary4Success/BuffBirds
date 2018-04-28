'use strict';

function init() {
  console.log('Script started!');
}

var background;
let birdPositionsX;
let birdPositionsY;
let birdVelocitiesX;
let birdVelocitiesY;
let birdVelocityXMean;
let birdVelocityXSTD;
let birdVelocityYMean;
let birdVelocityYSTD;

function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2);
  background = loadImage('http://www.guibingzhuche.com/data/out/173/1384241.png');
  birdVelocityXMean = 0.2;
  birdVelocityXSTD = birdVelocityXMean - 0.00001;
  birdVelocityYMean = 0;
  birdVelocityYSTD = 3;
  birdPositionsX = [-10];
  birdPositionsY = [randomGaussian(height / 2, height / 4)];
  birdVelocitiesX = [randomGaussian(birdVelocityXMean, birdVelocityXSTD)];
  birdVelocitiesY = [randomGaussian(birdVelocityYMean, birdVelocityYSTD)];
  console.log(birdPositionsY[0]);
}


function draw() {
  // put code here that needs to run at every image update
  clear();
  let radius = 50;
  ellipse(birdPositionsX[0], birdPositionsY[0], radius);

  birdPositionsX[0] += birdVelocitiesX[0];
  birdPositionsY[0] += birdVelocitiesY[0];

  birdVelocitiesX[0] += randomGaussian(birdVelocityXMean, birdVelocityXSTD);
  birdVelocitiesY[0] += randomGaussian(birdVelocityYMean, birdVelocityYSTD);

  if (birdPositionsX[0] > width)
  {
    birdPositionsX[0] = -10;
    birdVelocitiesX[0] = 0;
    birdVelocitiesY[0] = 0;
  }
  if (birdPositionsY[0] > height - (radius / 2))
    birdPositionsY[0] = height - (radius / 2);
  else if (birdPositionsY[0] < radius / 2)
    birdPositionsY[0] = radius / 2;
  
}

function windowResized() {
  // put code here that needs to run in the beginning once
  resizeCanvas(windowWidth / 2 , windowHeight / 2);
}
