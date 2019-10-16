let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let documnetCanvas = document.getElementById('canvas');
let splashScreen = document.getElementById('splash-screen');
let gameOver = document.getElementById('game-over');
let highScore = document.getElementById('high-score');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const CAR_WIDTH = 100;
const CAR_HEIGHT = 100;
const LEFT_CAR_X_POSITION = 50;
const CENTER_CAR_X_POSITION = 250;
const RIGHT_CAR_X_POSITION = 450;
const CHANGE_CAR_X_POSITION_BY = 200;
const CAR_X_POSITION_LIMIT = 50;
const RANDOM_NUMBER_FROM = 0;
const RANDOM_NUMBER_TO = 3;
const BACKGROUND_X_POSITION = 0;
const BACKGROUND_Y_POSITION = 0;
const BULLET_POSITION = (CAR_WIDTH / 2) - 20;
const BULLET_Y_POSITION = 490;
const BULLET_WIDTH = 50;
const BULLET_HEIGHT = 30;


const DEFAULT_CAR_POSITION = 'center';
const BULLET_COLOR = 'red';
const OBSTACLE_CAR = './images/obstacle.png';
const PLAYER_CAR = './images/player.png';
const BACKGROUND = './images/background.png';
const BULLET = './images/rocket.gif';
const CAR_SOUND = './sound/drive.mp3';

class GameArea {

    obstacles = [];
    bullets = [];
    frameNo = 1;
    key = null;
    interval = null;
    obstaclePosition = [LEFT_CAR_X_POSITION, CENTER_CAR_X_POSITION, RIGHT_CAR_X_POSITION];
    score = 0;
    isKeyPressed = false;
    bullet = null;
    bulletXPosition = null;

    constructor(car) {
        this.car = car;
        this.addSpaceEvent();
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
        this.drawBackground();

        this.car.changePosition();
        this.car.draw();

        this.createObstacles();
        this.drawObstacle();

        this.drawScore();

        if (this.bullets.length >= 0) {
            this.fireBullet();
        }

        this.createBullet();
    }

    setInterval() {
        this.interval = setInterval(this.updateFrame.bind(this), 5);
    }


    clear() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawBackground() {
        let background = new Component(BACKGROUND_X_POSITION, BACKGROUND_Y_POSITION, CANVAS_WIDTH, CANVAS_HEIGHT, BACKGROUND);
        background.draw();
    }

    createObstacles() {
        this.frameNo++;
        let randomIndex = this.generateRandomInt(RANDOM_NUMBER_FROM, RANDOM_NUMBER_TO);
        if (this.onEveryInterval(300)) {
            this.obstacles.push(new Obstacle(this.obstaclePosition[randomIndex], 0, CAR_WIDTH, CAR_HEIGHT, OBSTACLE_CAR));
        }
    }

    createBullet() {
        if (this.isKeyPressed && this.key === ' ') {
            let pos = this.car.getPosition();
            if (pos === 'center') {
                this.bulletXPosition = CENTER_CAR_X_POSITION + BULLET_POSITION;
            } else if (pos === 'left') {
                this.bulletXPosition = LEFT_CAR_X_POSITION + BULLET_POSITION;
            } else if (pos === 'right') {
                this.bulletXPosition = RIGHT_CAR_X_POSITION + BULLET_POSITION;
            }
            if (this.bullets.length < 10) {
                this.bullet = new Bullet(this.bulletXPosition, BULLET_Y_POSITION, BULLET_WIDTH, BULLET_HEIGHT, BULLET);
                this.bullets.push(this.bullet);
                this.isKeyPressed = false;
            }
        }
    }

    fireBullet() {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move();
            if (this.bullets[i].y < 0) {
                this.bullets.splice(i, 1);
            }
            this.bullets[i].draw();
        }
    }

    addSpaceEvent() {
        window.addEventListener('keydown', e => {
            this.isKeyPressed = true;
            this.key = e.key;
        });
        window.addEventListener('keyup', () => {
            this.isKeyPressed = false;
        });
    }

    drawObstacle() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].y += this.obstacles[i].dy;
            if (this.obstacles[i].y > CANVAS_WIDTH) {
                this.getScore();
                this.obstacles.splice(i, 1);
            }
            this.obstacles[i].draw();
            this.detectCollision(this.obstacles[i]);
            for (let j = 0; j < this.bullets.length; j++) {
                this.detectCollisionWithBullet(this.bullets[j], this.obstacles[i]);
            }
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

    checkCollisionWithBullet(bullet, obstacle) {
        return bullet.x < obstacle.x + obstacle.width &&
            bullet.x + bullet.width > obstacle.x &&
            bullet.y < obstacle.y + obstacle.height &&
            bullet.y + bullet.height > obstacle.y;
    }

    detectCollision(obstacle) {
        if (this.checkCollision(obstacle)) {
            clearInterval(this.interval);
            documnetCanvas.style.display = 'none';
            gameOver.style.display = 'block';
            let finalScore = parseInt(sessionStorage.getItem('highScore'));
            highScore.innerHTML = 'HighScore: ' + (finalScore + 1);   
        }
    }

    detectCollisionWithBullet(bullet, obstacle) {
        if (this.checkCollisionWithBullet(bullet, obstacle)) {
            this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
            this.bullets.splice(this.bullets.indexOf(bullet), 1);
        }
    }

    drawScore() {
        context.font = '30px' + ' ' + 'Consolas';
        context.fillStyle = 'black';
        context.fillText('Score: ' + this.score, 240, 40);
    }

    getScore() {
        let score = this.score++;
        sessionStorage.setItem('highScore', score);
        return score;
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
    bullet = null;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.isKeyPressed = false;
        this.carPosition = DEFAULT_CAR_POSITION;
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
                    if (this.x + CAR_WIDTH < CANVAS_WIDTH - CAR_X_POSITION_LIMIT) {
                        this.dx = CHANGE_CAR_X_POSITION_BY;
                        this.x += this.dx;
                        this.isKeyPressed = false;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.x > CAR_X_POSITION_LIMIT) {
                        this.dx = -CHANGE_CAR_X_POSITION_BY;
                        this.x += this.dx;
                        this.isKeyPressed = false;
                    }
                    break;
            }
        }
    }

    getPosition() {
        switch (this.x) {
            case LEFT_CAR_X_POSITION:
                this.carPosition = 'left';
                break;
            case CENTER_CAR_X_POSITION:
                this.carPosition = 'center';
                break;
            case RIGHT_CAR_X_POSITION:
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

class Bullet extends Component {

    dy = 1;

    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        return this;
    }

    move() {
        this.y -= this.dy;
    }
}

function start() {
    canvas.style.display = 'block';

    let car = new Car(CENTER_CAR_X_POSITION, 500, CAR_WIDTH, CAR_HEIGHT, PLAYER_CAR);
    let game = new GameArea(car);
    game.start();

    splashScreen.style.display = 'none';
    gameOver.style.display = 'none';
}