'use strict';

function init() {
  console.log('Script started!');
}

document.getElementById('root').addEventListener('load', init);

function setup() {
  // put code here that needs to run in the beginning once
  createCanvas(windowWidth / 2, windowHeight / 2);
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  let radius = 50;
  let randomY = randomGaussian(displayHeight / 2, displayHeight / 2);
  ellipse(50, randomY, radius, radius);
}

function windowResized() {
  resizeCanvas(windowWidth / 2 , windowHeight / 2);
}
