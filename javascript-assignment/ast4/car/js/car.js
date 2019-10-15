let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const CAR_WIDTH = 100;
const CAR_HEIGHT = 150;
const OBSTACLE_CAR = './images/obstacle.png';
const PLAYER_CAR = './images/player.png';
const CAR_COLOR = 'green';
const LINE_COLOR = 'white';

class GameArea {

    obstacles = [];
    frameNo = 1;
    requestAnimationFrameId = null;
    interval = null;

    constructor(car) {
        this.car = car;
        return this;
    }

    start() {
        this.setInterval();
    }

    updateFrame() {

        this.clear();
        this.drawLines();

        this.car.changePosition();
        this.car.draw();

        this.createObstacles();
        this.drawObstacle();
    }

    setInterval() {
        this.interval = setInterval(this.updateFrame.bind(this), 10);
    }


    clear() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawLines() {
        let lineOne = new Component(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, './images/background.png', 'line');
        lineOne.draw();
    }

    createObstacles() {
        this.frameNo++;
        if (this.frameNo === 1 || this.onEveryInterval(200)) {
            this.obstacles.push(new Obstacle(50, 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_CAR, 'obstacle'));
        }
        if (this.frameNo === 1 || this.onEveryInterval(400)) {
            this.obstacles.push(new Obstacle(250, 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_CAR, 'obstacle'));
        }
        if (this.frameNo === 1 || this.onEveryInterval(800)) {
            this.obstacles.push(new Obstacle(450, 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_CAR, 'obstacle'));
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
            clearInterval(this.interval);
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
        this.image = new Image();
        this.image.src = this.color;
        this.type = type;
        return this;
    }

    draw() {
        if (this.type === 'line') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        if (this.type === 'car') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        if (this.type === 'obstacle') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        this.carPosition = 'center';
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

    changePosition() {
        if (this.isKeyPressed) {
            switch (this.key) {
                case 'ArrowRight':
                    if (this.x + CAR_WIDTH < CANVAS_WIDTH - 50) {
                        this.dx = 14.3;
                        this.x += this.dx;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.x > 50) {
                        this.dx = -14.3;
                        this.x += this.dx;
                    }
                    break;
            }
        }
    }
}

class Obstacle extends Component {

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        return this;
    }
}

let car = new Car(250, 650, CAR_WIDTH, CAR_HEIGHT, PLAYER_CAR, 'car');
let game = new GameArea(car);
game.start();