'use strict';

let background;

function init() {
  console.log('Script started!');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background = loadImage('http://www.guibingzhuche.com/data/out/173/1384241.png');
}

function draw() {
  clear();
  background(background);
  ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
