/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  console.log('Script started!');
}

let background;
var canvasWidth;
var canvasHeight;
function setup() {
  canvasWidth = windowWidth / 2;
  canvasHeight = windowHeight / 2;
  createCanvas(canvasWidth, canvasHeight);
  background = loadImage('./res/images/background.png');
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(background);
  ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
  // put code here that needs to run in the beginning once
  resizeCanvas(canvasWidth, canvasHeight);
}

function onMouseClick() {

}
