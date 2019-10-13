let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 1200;
const OBSTACLE_WIDTH = 100;

class GameArea {

    interval = null;
    frameNo = 1;
    obstacles = [];

    constructor(bird) {
        this.bird = bird;
        return this;
    }

    start() {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        document.body.insertBefore(canvas, document.body.childNodes[0]);
        this.setInterval();
    }

    updateFrame() {
        this.clear();
        this.drawBackgrond();
        this.bird.draw();
        this.bird.move();
        this.createObstacles();
        this.drawObstacles();
        this.drawScore();

    }

    createObstacles() {
        this.frameNo++;
        if (this.frameNo === 1 || this.onEveryInterval(600)) {
            let minHeight = 200;
            let maxHeight = 400;
            let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            let minGap = 100;
            let maxGap = 200;
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            let x = 1200;
            this.obstacles.push(new Obstacle(x, 0, OBSTACLE_WIDTH, height, './obstacleUp.png', 'obstacles'));
            this.obstacles.push(new Obstacle(x, height + gap, OBSTACLE_WIDTH, x - height - gap, './obstacleDown.png', 'obstacles'));
        }
    }

    drawBackgrond() {
        let backgroundImage = new Component(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, './background.png', 'background');
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
        score.draw(this.calculateScore());
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
        }
    }

    calculateScore() {
        return this.frameNo++;
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
        }else if (this.type === 'background') {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type === 'obstacles'){
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
    gravity = 0.05; 
    gravitySpeed = 0; 
    speedX = 0;
    speedY = 0;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        this.addEvent();
        return this;
    }

    move() {
        this.accelerateUp();
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }

    hitBottom() {
        let rockBottom = canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = 0;
        }
    }

    accelerateUp() {
        if (this.key === 32 && this.isKeyPressed) {
            this.gravity = -0.1;
        } else {
            this.gravity = 0.1;
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

let bird = new Bird(10, 300, 38, 26, './bird.png', 'bird');
let game = new GameArea(bird);
game.start();