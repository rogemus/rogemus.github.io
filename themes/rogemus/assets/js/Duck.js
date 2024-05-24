import { getRandomIntInRange, getRandomFloatInRange } from './utils';

const $img = document.getElementById('duck');

const imgSize = {
  width: 80 / 2,
  height: 65 / 2
}

export class Duck {
  x = 0;
  y = 0;
  sizeX = imgSize.width;
  sizeY = imgSize.height;
  scale = 1;
  speedScale = 1;
  rotateScale = 1;

  constructor() {
    this.x = getRandomIntInRange(window.innerWidth);
    this.y = getRandomIntInRange(200);
    this.scale = getRandomFloatInRange(0.75, 2.15);
    this.sizeX *= this.scale;
    this.sizeY *= this.scale;
    this.rotateScale = getRandomFloatInRange(0.75, 2.5)
    this.speedScale = getRandomFloatInRange(1.2, 3);
  }

  isOffScreen(windowHeight) {
    return this.y > windowHeight;
  }

  animate(fallingOffset, ctx) {
    const xCenter = this.x + (this.sizeX / 2);
    const yCenter = this.y + (this.sizeY / 2);
    const offset = fallingOffset * this.speedScale;
    ctx.save();
    ctx.translate(xCenter, yCenter);
    ctx.rotate((this.y / this.rotateScale) * Math.PI / 180);
    ctx.translate(-xCenter, -yCenter);
    this.y = Math.floor(this.y + offset);
    ctx.drawImage($img, this.x, this.y, this.sizeX, this.sizeY);
    ctx.restore();
  }
}

