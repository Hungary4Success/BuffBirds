'use strict';

function init() {
  console.log('Script started!');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}