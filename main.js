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
  ellipse(50, 50, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth / 2 , windowHeight / 2);
}
