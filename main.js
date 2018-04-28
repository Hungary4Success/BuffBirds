'use strict';

function init() {
  console.log('Script started!');
}

function setup() {
  createCanvas(1920, 1080);
}

function draw() {
  clear();
  ellipse(mouseX, mouseY, 50, 50);
}