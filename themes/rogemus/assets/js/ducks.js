import { Duck } from './Duck';

const config = {
  fallingTickDistance: 5,
  windowBufforTop: 250,
  windowBufforBottom: 250,
  maxNumberOfDucks: 50,
  newDucksInterval: 6 * 1000,
  newDucksCount: 7,
}

const $canvas = document.getElementById('ducks');
const canvasHeight = window.innerHeight + config.windowBufforBottom + config.windowBufforTop;
const ctx = $canvas.getContext("2d");

let ducks = [];
let last = 0;
let time = Date.now();

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight + 500;

const createDucks = (count) => (
  Array(count).fill(null).map(() => new Duck())
);

const animateDucks = (deltaTime) => {
  ctx.clearRect(0, 0, window.innerWidth, canvasHeight);
  const currentTime = Date.now();
  const speed = deltaTime * 0.02;
  time = currentTime;

  for (let i = 0; i < ducks.length; i++) {
    ducks[i].animate(config.fallingTickDistance * speed, ctx)

    if (ducks[i].isOffScreen(canvasHeight)) {
      delete ducks[i];
      ducks.splice(i, 1);
    }
  }
}

const step = (now) => {
  if (
    (!last || now - last > config.newDucksInterval) &&
    ducks.length <= config.maxNumberOfDucks
  ) {
    last = now;
    const newDucks = createDucks(config.newDucksCount);
    ducks.push(...newDucks);

    console.log("🐤 !!! MORE DUCKS !!! 🐤")
    console.log(`🐤 count: ${ducks.length}`)
  }

  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  animateDucks(deltaTime);

  requestAnimationFrame(step);
};

const ducksAnimation = () => {
  requestAnimationFrame((ts) => {
    ducks = createDucks(config.newDucksCount);
    console.log('🐤 🐤 🐤 🐤 🐤 🐤 🐤 🐤 🐤 🐤 🐤 🐤 🐤')
    step(ts);
  });
}

window.onload = () => {
  if (window.innerWidth >= 500) {
    ducksAnimation();
  }
}
