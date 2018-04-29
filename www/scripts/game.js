/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

let flyingBirds;
let fallingBirds;
let walkingBirds;
let isRightBirds;
let birdPositionsX;
let birdPositionsY;

let anchorX;
let anchorY;

let birdVelocitiesX;
let birdVelocitiesY;
let birdVelocityXMean;
let birdVelocityXSTD;
let birdVelocityYMean;
let birdVelocityYSTD;

let leftBirdSprite;
let leftBirdSpriteImage;
let rightBirdSprite;
let rightBirdSpriteImage;

let leftFallingBirdSpriteImage;
let rightFallingBirdSpriteImage;

let rightWalkingBirdSprite;
let rightWalkingBirdSpriteImage;

let leftWalkingBirdSprite;
let leftWalkingBirdSpriteImage;

let backgroundImage;
let crosshairImage;

let font;

let canvasWidth;
let canvasHeight;
let thrownShakers;
let shakerSprite;
let mouseAngle;

let level = 0;

let startBirdNumber;
let score = 0;
let highScore = 0;
let shakerCount = 7;

const debug = false;

function Ammo(targetX, targetY, scale, angle, dist) {
  this.targetX = targetX;
  this.targetY = targetY;
  this.positionY = 0;
  this.scale = scale;
  this.angle = angle;
  this.dist = dist;
}

function FlyingBird(birdPositionX, birdPositionY, birdVelocityX, birdVelocityY, isRightBird) {
  this.birdPositionX = birdPositionX;
  this.birdPositionY = birdPositionY;
  this.birdVelocityX = birdVelocityX;
  this.birdVelocityY = birdVelocityY;
  this.isRightBird = isRightBird;
}

function FallingBird(birdPositionX, birdPositionY, isRightBird) {
  this.birdPositionX = birdPositionX;
  this.birdPositionY = birdPositionY;
  this.birdVelocityY = -5;
  this.isRightBird = isRightBird;
}

function WalkingBird(birdPositionX, birdPositionY, isRightBird) {
  this.birdPositionX = birdPositionX;
  this.birdPositionY = birdPositionY;
  this.walkingSpeed = Math.random() * (2 - 1) + 1;
  this.isRightBird = isRightBird;
}

function getCanvasDimensions() {
  return { width: 800, height: 500 };
}

function newBird() {
  const isGoingToBeRight = random(0, 100) < 50;
  let posX;
  if (isGoingToBeRight) {
    posX = width + rightBirdSprite.width;
  } else {
    posX = -leftBirdSprite.width - 10;
  }

  const retValue = new FlyingBird(
    posX,
    randomGaussian(height / 2, height / 4),
    randomGaussian(birdVelocityXMean, birdVelocityXSTD),
    randomGaussian(birdVelocityYMean, birdVelocityYSTD),
    isGoingToBeRight
  );

  if (retValue.birdPositionsY > height * 0.7) {
    retValue.birdPositionY = height * 0.6;
  }
  return retValue;
}

function preload() {
  crosshairImage = loadImage('./res/images/crosshair.png');
  if (level === 0) {
    leftBirdSprite = loadGif('./res/images/leftbird.gif');
    rightBirdSprite = loadGif('./res/images/rightbird.gif');
    rightBirdSpriteImage = loadImage('./res/images/rightbird.gif');
    leftBirdSpriteImage = loadImage('./res/images/leftbird.gif');

    rightFallingBirdSpriteImage = loadImage('./res/images/rightbuffbird.png');
    leftFallingBirdSpriteImage = loadImage('./res/images/leftbuffbird.png');

    rightWalkingBirdSprite = loadGif('./res/images/rightbuffbird.gif');
    rightWalkingBirdSpriteImage = loadImage('./res/images/rightbuffbird.gif');

    leftWalkingBirdSprite = loadGif('./res/images/leftbuffbird.gif');
    leftWalkingBirdSpriteImage = loadImage('./res/images/leftbuffbird.gif');

    backgroundImage = loadImage('./res/images/background.png');
    shakerSprite = loadImage('./res/images/shaker.png');
    font = loadFont('./res/fonts/SFPixelate.ttf');
  } else if (level === 1) {
    leftBirdSprite = loadGif('./res/images/leftbird.gif');
    rightBirdSprite = loadGif('./res/images/rightbird.gif');
    rightBirdSpriteImage = loadImage('./res/images/rightbird.gif');
    leftBirdSpriteImage = loadImage('./res/images/leftbird.gif');

    rightFallingBirdSpriteImage = loadImage('./res/images/rightbuffbird.png');
    leftFallingBirdSpriteImage = loadImage('./res/images/leftbuffbird.png');

    rightWalkingBirdSprite = loadGif('./res/images/rightbuffbird.gif');
    rightWalkingBirdSpriteImage = loadImage('./res/images/rightbuffbird.gif');

    leftWalkingBirdSprite = loadGif('./res/images/leftbuffbird.gif');
    leftWalkingBirdSpriteImage = loadImage('./res/images/leftbuffbird.gif');

    backgroundImage = loadImage('./res/images/background.png');
    shakerSprite = loadImage('./res/images/shaker.png');
    font = loadFont('./res/fonts/SFPixelate.ttf');
  }
}

function setup() {
  const { width, height } = getCanvasDimensions();
  const canvas = createCanvas(width, height);
  canvas.parent('container');

  noCursor();
  anchorX = width / 2;
  anchorY = height;

  birdVelocityXMean = 0.05;
  birdVelocityXSTD = birdVelocityXMean - 0.00001;
  birdVelocityYMean = 0;
  birdVelocityYSTD = 0.2;

  flyingBirds = [];
  fallingBirds = [];
  walkingBirds = [];

  startBirdNumber = 2;
  for (let i = 0; i < startBirdNumber; i++) {
    flyingBirds[i] = newBird();
  }
  thrownShakers = [];
}

function draw() {
  // put code here that needs to run at every image update
  clear();
  background(backgroundImage);

  if (shakerCount <= 0) {
    if (score === 7) {
      score = 0;
      shakerCount = 7;
      birdVelocityXMean += 0.01;
      birdVelocityXSTD = birdVelocityXMean - 0.00001;
      level++;
    } else if (thrownShakers.length === 0) {
      // Draw end screen
      textSize(60);
      text('GAME OVER', 215, 225);
      textSize(50);
      text(`LEVEL: ${level}`, 285, 300);
      console.log(level, highScore);
      if (level >= highScore) {
        fill(238, 64, 86);
        text('NEW HIGHSCORE!', 175, 375);
        fill(0);
        highScore = level;
      }
    }
  } else {
    // Draw score
    textSize(32);
    textFont(font);
    text(`SCORE: ${score}`, 15, 50);

    textSize(32);
    textFont(font);
    text(`LEVEL: ${level}`, 300, 50);

    // Draw current shaker
    push();
    translate(anchorX, anchorY);
    rotate(mouseAngle);
    image(shakerSprite, -75 / 2, -60, 75, 170);
    pop();
  }

  // Draw available shakers
  const startPositionX = 750;
  for (let i = 0; i < shakerCount; i++) {
    const positionX = startPositionX - i * 30;
    image(shakerSprite, positionX, 15, 25, 50);
  }

  // Draw flying birds
  for (let index = 0; index < flyingBirds.length; index++) {
    if (rightBirdSprite.loaded()) {
      if (flyingBirds[index].isRightBird) {
        image(rightBirdSprite, flyingBirds[index].birdPositionX, flyingBirds[index].birdPositionY);
      } else {
        image(leftBirdSprite, flyingBirds[index].birdPositionX, flyingBirds[index].birdPositionY);
      }
    } else if (flyingBirds[index].isRightBird) {
      image(
        rightBirdSpriteImage, flyingBirds[index].birdPositionX,
        flyingBirds[index].birdPositionY
      );
    } else {
      image(
        leftBirdSpriteImage, flyingBirds[index].birdPositionX,
        flyingBirds[index].birdPositionY
      );
    }

    if (debug) {
      flyingBirds[index].birdVelocityX = 1;
      flyingBirds[index].birdVelocityY = 0;
    }
    // Update birds
    if (flyingBirds[index].isRightBird) {
      flyingBirds[index].birdPositionX -= flyingBirds[index].birdVelocityX;
    } else {
      flyingBirds[index].birdPositionX += flyingBirds[index].birdVelocityX;
    }
    flyingBirds[index].birdPositionY += flyingBirds[index].birdVelocityY;

    flyingBirds[index].birdVelocityX += randomGaussian(
      birdVelocityXMean,
      birdVelocityXSTD
    );
    flyingBirds[index].birdVelocityY += randomGaussian(
      birdVelocityYMean,
      birdVelocityYSTD
    );

    if (flyingBirds[index].isRightBird
      && flyingBirds[index].birdPositionX < -leftBirdSprite.width) {
      flyingBirds[index] = newBird();
    } else if (!flyingBirds[index].isRightBird && flyingBirds[index].birdPositionX > width) {
      flyingBirds[index] = newBird();
    }
    if (flyingBirds[index].birdPositionY > height * 0.65) {
      flyingBirds[index].birdPositionY = height * 0.65;
    } else if (flyingBirds[index].birdPositionY < 0) {
      flyingBirds[index].birdPositionY = 0;
    }
  }

  // Draw falling birds
  for (let index = 0; index < fallingBirds.length; index++) {
    if (fallingBirds[index].isRightBird) {
      image(
        rightFallingBirdSpriteImage,
        fallingBirds[index].birdPositionX,
        fallingBirds[index].birdPositionY
      );
    } else {
      image(
        leftFallingBirdSpriteImage,
        fallingBirds[index].birdPositionX,
        fallingBirds[index].birdPositionY
      );
    }

    if (fallingBirds[index].birdPositionY < 400) {
      fallingBirds[index].birdPositionY += fallingBirds[index].birdVelocityY;
      fallingBirds[index].birdVelocityY += 0.3;
    } else {
      walkingBirds.push(new WalkingBird(
        fallingBirds[index].birdPositionX,
        fallingBirds[index].birdPositionY,
        fallingBirds[index].isRightBird
      ));
      fallingBirds.splice(index, 1);
    }
  }

  // Draw walking birds
  for (let index = 0; index < walkingBirds.length; index++) {
    if (walkingBirds[index].isRightBird) {
      image(
        rightWalkingBirdSprite,
        walkingBirds[index].birdPositionX,
        walkingBirds[index].birdPositionY
      );
      walkingBirds[index].birdPositionX -= walkingBirds[index].walkingSpeed;
    } else {
      image(
        leftWalkingBirdSprite,
        walkingBirds[index].birdPositionX,
        walkingBirds[index].birdPositionY
      );
      walkingBirds[index].birdPositionX += walkingBirds[index].walkingSpeed;
    }
  }

  if (getMouseAngle() !== 'Mouse out of bounds') {
    mouseAngle = getMouseAngle();
  }

  image(crosshairImage, mouseX - 25, mouseY - 25, 50, 50);

  // Draw flying shakers
  if (thrownShakers.length > 0) {
    const speed = 30;
    for (let shaker = 0; shaker < thrownShakers.length; shaker++) {
      const newShakerSprite = shakerSprite.get();
      const current = thrownShakers[shaker];
      newShakerSprite.resize(
        shakerSprite.width * current.scale,
        shakerSprite.height * current.scale
      );

      if (abs((current.positionY + newShakerSprite.height / 2) - current.dist) < speed) {
        thrownShakers.splice(shaker, 1);
        if (debug) console.log('At cross');
        for (let index = 0; index < flyingBirds.length; index++) {
          if (debug) {
            console.log(
              current.targetX,
              current.targetY,
              flyingBirds[index].birdPositionX,
              flyingBirds[index].birdPositionY
            );
          }

          const didCollide = collideRectRect(
            current.targetX,
            current.targetY,
            current.scale * shakerSprite.width,
            current.scale * shakerSprite.height,
            flyingBirds[index].birdPositionX,
            flyingBirds[index].birdPositionY,
            leftBirdSprite.width,
            leftBirdSprite.height
          );

          if (didCollide) {
            if (debug) console.log('hit!');
            score++;

            // TODO: add new fallingBird to fallingBird array with position of this one
            fallingBirds.push(new FallingBird(
              flyingBirds[index].birdPositionX,
              flyingBirds[index].birdPositionY,
              flyingBirds[index].isRightBird
            ));

            // deletes bird from array
            flyingBirds.splice(index, 1);

            flyingBirds.push(newBird());
          } // if collideRectRect()
        } // for consuela
      } // if abs()
      push();
      translate(anchorX, anchorY);
      rotate(current.angle);
      image(newShakerSprite, -75 / 2, current.positionY);
      pop();

      current.positionY -= speed;
      current.scale -= 0.015;
    }
  }
} // for index

function windowResized() {
  // put code here that needs to run in the beginning once
  const { width, height } = getCanvasDimensions();
  resizeCanvas(width, height);
}

function mouseClicked() {
  const angle = getMouseAngle();
  if (angle !== 'Mouse out of bounds' && shakerCount > 0) {
    thrownShakers.push(new Ammo(
      mouseX,
      mouseY,
      0.5,
      angle,
      -dist(anchorX, anchorY, mouseX, mouseY)
    ));
    shakerCount--;
  }

  if (shakerCount <= 0 && thrownShakers.length <= 0 && score < 7) {
    score = 0;
    level = 0;
    shakerCount = 7;
    birdVelocityXMean = 0.05;
    birdVelocityXSTD = birdVelocityXMean - 0.00001;
  }
}

function getMouseAngle() {
  if (mouseX > 0 && mouseX < 800 && mouseY > 0 && mouseY < 500) {
    return atan((mouseX - 400) / (height - mouseY));
  }

  return 'Mouse out of bounds';
}
