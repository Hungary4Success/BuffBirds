'use strict';

function init() {
  console.log('Script started!');
}

let background;

function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2);
  background = loadImage('http://www.guibingzhuche.com/data/out/173/1384241.png');
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(background);
  ellipse(50, 50, 50, 50);
}

function windowResized() {
  // put code here that needs to run in the beginning once
  resizeCanvas(windowWidth / 2 , windowHeight / 2);
}
