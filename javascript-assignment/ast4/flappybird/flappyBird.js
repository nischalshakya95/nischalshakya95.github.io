let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";

class GameArea {

    interval = null;
    frameNo = 1;
    obstacles = [];

    constructor(bird) {
        this.bird = bird;
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
        this.createObstacles();
        this.drawObstacles();
    }

    createObstacles() {
        this.frameNo++;
        if (this.frameNo === 1 || this.onEveryInterval(150)) {
            let minHeight = 10;
            let maxHeight = 200;
            let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            let minGap = 50;
            let maxGap = 200;
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            let x = canvas.width;
            this.obstacles.push(new Obstacle(x, 0, 10, height, 'green'));
            this.obstacles.push(new Obstacle(x, height + gap, 10, x - height - gap, "green"));
        }
    }

    drawObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= this.obstacles[i].dx;
            this.obstacles[i].draw();
            this.detectCollision(this.obstacles[i]);
        }
    }

    onEveryInterval(n) {
        return (this.frameNo / n) % 1 === 0;
    }

    clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    setInterval() {
        this.interval = setInterval(this.updateFrame.bind(this), 10);
    }

    checkCollision(obstacle) {
        return this.bird.x < obstacle.x + obstacle.width &&
            this.bird.x + this.bird.width > obstacle.x &&
            this.bird.y < obstacle.y + obstacle.height &&
            this.bird.y + this.bird.height > obstacle.y;
    }

    detectCollision(obstacle) {
        if (this.checkCollision(obstacle)) {
            clearInterval(this.interval);
            alert('game over');
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
let game = new GameArea(bird);
game.start();

