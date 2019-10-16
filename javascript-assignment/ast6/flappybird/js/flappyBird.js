let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');


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
        this.drawForeGround();
        this.drawBackground();
        
        // this.bird.move(this.interval);
        this.bird.move();
        this.bird.draw();

        // this.createObstacles();
        // this.drawObstacles();
        // this.drawScore();
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

    drawBackground() {
        let background = new Component(BACKGROUND_X_POSITION, BACKGROUND_Y_POSITION, BACKGROUND_WIDTH, BACKGROUND_HEIGHT, BACKGROUND_IMAGE_URL, 'background');
        background.draw();
    }

    drawForeGround() {
        let foreground = new Component(FOREGROUND_X_POSITION, FOREGROUND_Y_POSITION, FOREGROUND_WIDTH, FOREGROUND_HEIGHT, FOREGROUND_IMAGE_URL, 'background');
        foreground.draw();
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



class Obstacle extends Component {

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        return this;
    }

}


let bird = new Bird(BIRD_X_POSITION, BIRD_Y_POSITION, BIRD_WIDTH, BIRD_HEIGHT, BIRD_IMAGE_URL);
let game = new GameArea(bird);
game.start();