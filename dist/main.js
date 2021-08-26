let SCREEN;
let ctx;
let canvas;
const GRAVITY = 1;
window.onload = initCanvas();

function initCanvas() {
  SCREEN = {};
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

  SCREEN["SCREEN_WIDTH"] = window.innerWidth;
  SCREEN["SCREEN_HEIGHT"] = window.innerHeight;
  canvas.width = SCREEN.SCREEN_WIDTH;
  canvas.height = SCREEN.SCREEN_HEIGHT;

  document.body.appendChild(canvas);
}

window.addEventListener("resize", () => {
  SCREEN["SCREEN_WIDTH"] = window.innerWidth;
  SCREEN["SCREEN_HEIGHT"] = window.innerHeight;
  canvas.width = SCREEN.SCREEN_WIDTH;
  canvas.height = SCREEN.SCREEN_HEIGHT;
});

class Particle {
  constructor(ctx, x, y, vx, vy, r, f, clr) {
    this.pos = {
      x: x,
      y: y,
    };

    this.speed = {
      x: vx,
      y: vy,
    };

    this.gravity = GRAVITY;
    this.friction = f;
    this.r = r;
    this.clr = clr;
    this._ctx = ctx;
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = this.clr;
    this._ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    this._ctx.fill();
    this._ctx.closePath();
  }

  update() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    if (this.pos.y + this.r + this.speed.y >= SCREEN.SCREEN_HEIGHT) {
      this.speed.y = -this.speed.y * this.friction;
    } else {
      this.speed.y += this.gravity;
    }
    this.draw();
  }
}

function randFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let particles = [];

window.addEventListener("click", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  let randR = randFromRange(10, 30);
  let randVy = Math.random() * 10;

  let randClr = `rgb(
      ${Math.round(Math.random() * 255)},
      ${Math.round(Math.random() * 255)},
      ${Math.round(Math.random() * 255)}
      )`;

  let randF = randR > 20 ? 0.3 : 0.8;

  particles.push(new Particle(ctx, x, y, 0, randVy, randR, randF, randClr));
});

requestAnimationFrame(LOOP);

function LOOP() {
  requestAnimationFrame(LOOP);

  ctx.fillStyle = "rgba(0, 0, 0, .5)";
  ctx.fillRect(0, 0, SCREEN.SCREEN_WIDTH, SCREEN.SCREEN_HEIGHT);

  if (particles) particles.forEach((particle) => particle.update());
}
