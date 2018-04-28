/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  console.log('Script started!');
}

let backgroundImage;
let canvasWidth;
let canvasHeight;

function getCanvasDimensions() {
  return { width: 800, height: 500 };
}

function setup() {
  const { width, height } = getCanvasDimensions();
  const canvas = createCanvas(width, height);
  canvas.parent('container');
  backgroundImage = loadImage('./res/images/background.png');
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);
  ellipse(mouseX, mouseY, 50, 50);
}

function windowResized() {
  // put code here that needs to run in the beginning once
  const { width, height } = getCanvasDimensions();
  resizeCanvas(width, height);
}

function onMouseClick() {

}
