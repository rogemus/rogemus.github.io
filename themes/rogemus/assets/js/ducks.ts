import { Duck } from "./Duck";
import { isOffScreen } from "./utils";

const config = {
  fallingTickDistance: 5,
  windowBufforTop: 250,
  windowBufforBottom: 250,
  maxNumberOfDucks: 50,
  newDucksInterval: 6 * 1000,
  newDucksCount: 7,
};

const $canvas = document.getElementById("ducks") as HTMLCanvasElement;
const canvasHeight = window.innerHeight + config.windowBufforBottom + config.windowBufforTop;
const ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;

let ducks: Duck[] = [];
let last = 0;
let time = Date.now();

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight + 500;

const createDucks = (count: number): Duck[] =>
  Array(count)
    .fill(null)
    .map(() => new Duck());

const animateDucks = (deltaTime: number): void => {
  ctx.clearRect(0, 0, window.innerWidth, canvasHeight);
  const currentTime = Date.now();
  const speed = deltaTime * 0.02;
  time = currentTime;

  for (let i = 0; i < ducks.length; i++) {
    ducks[i].animate(config.fallingTickDistance * speed, ctx);

    if (isOffScreen(ducks[i].y, canvasHeight)) {
      delete ducks[i];
      ducks.splice(i, 1);
    }
  }
};

const step = (now: number): void => {
  if ((!last || now - last > config.newDucksInterval) && ducks.length <= config.maxNumberOfDucks) {
    last = now;
    const newDucks = createDucks(config.newDucksCount);
    ducks.push(...newDucks);
  }

  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  animateDucks(deltaTime);

  requestAnimationFrame(step);
};

const ducksAnimation = (): void => {
  requestAnimationFrame((ts) => {
    ducks = createDucks(config.newDucksCount);
    step(ts);
  });
};

window.addEventListener("load", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.innerWidth >= 500 && !prefersReducedMotion) {
    ducksAnimation();
  }
});
