let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 1200;
const OBSTACLE_WIDTH = 200;

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
            let minHeight = 20;
            let maxHeight = 200;
            let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            let minGap = 50;
            let maxGap = 150;
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            let x = canvas.width;
            this.obstacles.push(new Obstacle(x, 0, OBSTACLE_WIDTH, height, './obstacle-down.png', 'obstacles'));
            this.obstacles.push(new Obstacle(x, height + gap + 20, OBSTACLE_WIDTH, x - height - gap, './obstacle-up.png', 'obstacles'));
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

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
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

let bird = new Bird(10, 300, 150, 150, './tenor.gif', 'bird');
let game = new GameArea(bird);
game.start();

