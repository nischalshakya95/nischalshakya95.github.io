let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";

class GameArea {

  interval = null;

  constructor(bird, obstacle) {
    this.bird = bird;
    this.obstacle = obstacle;
    return this;
  }

  start() {
    canvas.width = 480;
    canvas.height = 500;
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    this.setInterval();
  }

  updateFrame() {
    this.clear();
    this.bird.draw();
    this.bird.move();
    this.obstacle.x -= this.obstacle.dx;
    this.detectCollision();
    this.obstacle.draw();
  }

  clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  setInterval() {
    this.interval = setInterval(this.updateFrame.bind(this), 10);
  }

  checkCollision() {
    if (this.bird.x < this.obstacle.x + this.obstacle.width &&
      this.bird.x + this.bird.width > this.obstacle.x &&
      this.bird.y < this.obstacle.y + this.obstacle.height &&
      this.bird.y + this.bird.height > this.obstacle.y) {
      return true;
    } else {
      return false;
    }
  }

  detectCollision() {
    if (this.checkCollision()) {
      clearInterval(this.interval);
    }
  }
}

class Component {
  dx = 1;
  dy = 1;

  constructor(x, y, width, height, color) {
    this.setInitialPosition(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
    return this;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  setInitialPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Bird extends Component {

  isKeyPressed = true;
  key = null;

  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.addEvent();
    return this;
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
}

class Obstacle extends Component {

  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    return this;
  }

}

let bird = new Bird(10, 300, 20, 20, "red");
let obstacle = new Obstacle(300, 300, 10, 200, "green");
let game = new GameArea(bird, obstacle);
game.start();

