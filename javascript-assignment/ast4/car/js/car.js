let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const CAR_WIDTH = 100;
const CAR_HEIGHT = 150;
const LEFT_CAR_POSITION_X = 50;
const CENTER_CAR_POSITION_X = 250;
const RIGHT_CAR_POSITION_X = 450;
const CHANGE_CAR_POSITION_X_BY = 200;
const RANDOM_NUMBER_FROM = 0;
const RANDOM_NUMBER_TO = 3;

const OBSTACLE_CAR = './images/obstacle.png';
const PLAYER_CAR = './images/player.png';
const BACKGROUND = './images/background.png';

class GameArea {

    obstacles = [];
    frameNo = 1;
    interval = null;
    obstaclePosition = [LEFT_CAR_POSITION_X, CENTER_CAR_POSITION_X, RIGHT_CAR_POSITION_X];
    score = 0;

    constructor(car) {
        this.car = car;
        return this;
    }

    generateRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max - min)) + min;
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

        this.drawScore();
    }

    setInterval() {
        this.interval = setInterval(this.updateFrame.bind(this), 5);
    }


    clear() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawLines() {
        let lineOne = new Component(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, BACKGROUND);
        lineOne.draw();
    }

    createObstacles() {
        this.frameNo++;
        let randomIndex = this.generateRandomInt(RANDOM_NUMBER_FROM, RANDOM_NUMBER_TO);
        if (this.frameNo === 1 || this.onEveryInterval(300)) {
            this.obstacles.push(new Obstacle(this.obstaclePosition[randomIndex], 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_CAR));
        }
    }

    drawObstacle() {
        for (let i = 0; i < this.obstacles.length; i++) {
            console.log(this.obstacles.length);
            this.obstacles[i].y += this.obstacles[i].dy;
            if (this.obstacles[i].y > CANVAS_WIDTH) {
                this.getScore();
                this.obstacles.splice(i, 1);
            }
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
            clearInterval(this.interval);
        }
    }

    drawScore() {
        context.font = '30px' + ' ' + 'Consolas';
        context.fillStyle = 'black';
        context.fillText('Score: ' + this.score, 240, 40);
    }

    getScore() {
        return this.score++;
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
        this.image = new Image();
        this.image.src = this.color;
        return this;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    setInitialPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Car extends Component {

    isKeyPressed = null;
    key = null;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
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
                        this.dx = CHANGE_CAR_POSITION_X_BY;
                        this.x += this.dx;
                        this.isKeyPressed = false;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.x > 50) {
                        this.dx = -CHANGE_CAR_POSITION_X_BY;
                        this.x += this.dx;
                        this.isKeyPressed = false;
                    }
                    break;
            }
        }
    }

    getPosition() {
        switch (this.x) {
            case LEFT_CAR_POSITION_X:
                this.carPosition = 'left';
                break;
            case CENTER_CAR_POSITION_X:
                this.carPosition = 'center';
                break;
            case RIGHT_CAR_POSITION_X:
                this.carPosition = 'right';
                break;
            default:
                this.carPosition = 'center';
        }
        return this.carPosition;
    }
}

class Obstacle extends Component {

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        return this;
    }
}

let car = new Car(CENTER_CAR_POSITION_X, 650, CAR_WIDTH, CAR_HEIGHT, PLAYER_CAR, 'car');
let game = new GameArea(car);
game.start();