let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const CAR_WIDTH = 100;
const CAR_HEIGHT = 100;
const OBSTACLE_COLOR = 'red';
const CAR_COLOR = 'green';
const LINE_COLOR = 'white';

class GameArea {

    obstacles = [];
    frameNo = 1;
    requestAnimationFrameId = null;

    constructor(car) {
        this.car = car;
        this.updateFrame();
        return this;
    }

    updateFrame() {

        this.clear();
        this.drawLines();

        this.car.draw();

        this.createObstacles();
        this.drawObstacle();

        this.requestAnimationFrameId = requestAnimationFrame(this.updateFrame.bind(this));
    }

    clear() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawLines() {
        let lineOne = new Component(200, 0, 5, CANVAS_HEIGHT, LINE_COLOR, 'line');
        let lineTwo = new Component(400, 0, 5, CANVAS_HEIGHT, LINE_COLOR, 'line');
        lineOne.draw();
        lineTwo.draw();
    }

    createObstacles() {
        this.frameNo++;
        if (this.frameNo === 1 || this.onEveryInterval(200)) {
            this.obstacles.push(new Obstacle(50, 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_COLOR, 'obstacle'));
        }
        if (this.frameNo === 1 || this.onEveryInterval(500)) {
            this.obstacles.push(new Obstacle(250, 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_COLOR, 'obstacle'));
        }
        if (this.frameNo === 1 || this.onEveryInterval(600)) {
            this.obstacles.push(new Obstacle(450, 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_COLOR, 'obstacle'));
        }
    }

    drawObstacle() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].y += this.obstacles[i].dy;
            this.obstacles[i].draw();
            this.detectCollision(this.obstacles[i]);
        }
    }

    onEveryInterval(n) {
        return (this.frameNo / n) % 1 === 0;
    }

    checkCollision(obstacle) {
        return this.car.x < obstacle.x + obstacle.width &&
            this.car.x + this.car.width > obstacle.x &&
            this.car.y < obstacle.y + obstacle.height &&
            this.car.y + this.car.height > obstacle.y;
    }

    detectCollision(obstacle) {
        if (this.checkCollision(obstacle)) {
            this.car.color = 'black';
            cancelAnimationFrame(this.requestAnimationFrameId);
        }
    }
}

class Component {

    dx = 1;
    dy = 1;

    constructor(x, y, width, height, color, type) {
        this.setInitialPosition(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        return this;
    }

    draw() {
        if (this.type === 'line') {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.type === 'obstacle' || this.type === 'car') {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    setInitialPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Car extends Component {

    isKeyPressed = null;
    key = null;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        this.isKeyPressed = false;
        this.addEvent();
        return this;
    }

    addEvent() {
        window.addEventListener('keydown', e => {
            this.isKeyPressed = true;
            this.key = e.key;
        });
        window.addEventListener('keyup', () => {
            this.isKeyPressed = false;
        });
    }
}

class Obstacle extends Component {

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        return this;
    }
}

let car = new Car(250, 700, CAR_WIDTH, CAR_HEIGHT, CAR_COLOR, 'car');
new GameArea(car);