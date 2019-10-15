let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;
const OBSTACLE_WIDTH = 100;

class GameArea {

    interval = null;
    frameNo = 1;
    obstacles = [];
    score = -3;

    constructor(bird) {
        this.bird = bird;
        this.scoreAudio = this.generateAudio('./sound/score.mp3');
        this.gameOverAudio = this.generateAudio('./sound/game-over.mp3');
        return this;
    }

    start() {
        this.setInterval();
    }

    updateFrame() {
        this.clear();
        this.drawBackgrond();
        this.bird.move(this.interval);
        this.bird.draw();
        this.createObstacles();
        this.drawObstacles();
        this.drawScore();
    }

    createObstacles() {
        this.frameNo++;
        if (this.frame === 1 || this.onEveryInterval(300)) {
            let minHeight = 200;
            let maxHeight = 400;
            let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            let minGap = 100;
            let maxGap = 200;
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            let x = CANVAS_WIDTH;
            this.obstacles.push(new Obstacle(x, 0, OBSTACLE_WIDTH, height, './images/obstacleUp.png', 'obstacles'));
            this.obstacles.push(new Obstacle(x, height + gap, OBSTACLE_WIDTH, x - height - gap, './images/obstacleDown.png', 'obstacles'));
            this.score++;
            if (this.score > 0) {
                this.scoreAudio.play();
            }
        }
    }

    drawBackgrond() {
        let backgroundImage = new Component(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, './images/background.png', 'background');
        backgroundImage.draw();
    }

    drawObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= this.obstacles[i].dx;
            this.obstacles[i].draw();
            this.detectCollision(this.obstacles[i]);
        }
    }

    drawScore() {
        let score = new Component(240, 40, '30px', 'Consolas', 'black', 'text');
        this.score < 0 ? score.draw(0) : score.draw(this.score);
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
            this.gameOverAudio.play();
            clearInterval(this.interval);
        }
    }

    generateAudio(path) {
        return new Audio(path);
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

    draw(score) {
        if (this.type === 'bird' || this.type === 'background' || this.type === 'obstacles') {
            this.image = new Image();
            this.image.src = this.color;
        }
        if (this.type === 'text') {
            context.font = this.width + ' ' + this.height;
            context.fillStyle = this.color;
            context.fillText('Score: ' + score, this.x, this.y);
        } else if (this.type === 'bird' || this.type === 'background') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type === 'background') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type === 'obstacles') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    setInitialPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Bird extends Component {

    isKeyPressed = true;
    key = null;
    gravity = 0.5;
    gravitySpeed = 0;
    speedX = 0;
    speedY = 0;


    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        this.sound = new Audio('./sound/fly.mp3');
        this.addEvent();
        return this;
    }

    move(interval) {
        this.accelerateUp();
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom(interval);
    }

    hitBottom(interval) {
        let rockBottom = canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = 0;
            clearInterval(interval);
        }
    }

    accelerateUp() {
        if (this.key === 32 && this.isKeyPressed) {
            this.gravity = -0.01;
            this.sound.play();
        } else {
            this.gravity = 0.01;
        }
    }

    addEvent() {
        window.addEventListener('keydown', e => {
            this.isKeyPressed = true;
            this.key = e.keyCode;
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

let bird = new Bird(10, 300, 38, 26, './images/bird.png', 'bird');
let game = new GameArea(bird);
game.start();