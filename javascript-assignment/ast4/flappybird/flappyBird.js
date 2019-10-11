let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";

class GameArea {
  constructor() {
    return this;
  }

  start() {
    canvas.width = 480;
    canvas.height = 500;
    document.body.insertBefore(canvas, document.body.childNodes[0]);
  }
}

class Bird {
  isKeyPressed = true;
  dx = 1;
  dy = 1;
  key = null;

  constructor(x, y, width, height, color) {
    this.setInitialPosition(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
    this.addEvent();
    return this;
  }

  drawBird() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  setInitialPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  updateFrame() {
    this.clear();
    this.drawBird();
    this.move();
  }

  move() {
    if (this.isKeyPressed) {
      switch (this.key) {
        case ARROW_UP:
          this.y += -this.dy;
          break;
        case ARROW_DOWN:
          this.y += this.dy;
          break;
        case ARROW_RIGHT:
          this.x += this.dx;
          break;
        case ARROW_LEFT:
          this.x += -this.dx;
          break;
      }
    }
  }

  addEvent() {
    window.addEventListener("keydown", e => {
      this.isKeyPressed = true;
      this.key = e.key;
    });

    window.addEventListener("keyup", () => {
      this.isKeyPressed = false;
    });
  }

  interval() {
    setInterval(this.updateFrame.bind(this), 10);
  }
}

class Obstacle {
    
}

let game = new GameArea();
game.start();
let bird = new Bird(10, canvas.height / 2, 20, 20, "red");
bird.interval();
