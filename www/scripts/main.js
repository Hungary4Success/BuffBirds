/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  console.log('Script started!');
}

let backgroundImage;
let crosshairImage;
let canvasWidth;
let canvasHeight;

function setup() {
  canvasWidth = windowWidth / 2;
  canvasHeight = windowHeight / 2;
  createCanvas(canvasWidth, canvasHeight);
  backgroundImage = loadImage('./res/images/background.png');
  crosshairImage = loadImage('./res/images/crosshair.png');
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);
  image(crosshairImage, mouseX - 25, mouseY - 25, 50, 50);
}

function windowResized() {
  // put code here that needs to run in the beginning once
  canvasWidth = windowWidth / 2;
  canvasHeight = windowHeight / 2;
  resizeCanvas(canvasWidth, canvasHeight);
}

function onMouseClick() {

}
