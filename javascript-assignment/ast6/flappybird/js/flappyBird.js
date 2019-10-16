let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');


class GameArea {

    interval = null;
    frameNo = 1;
    obstacles = [];
    score = -2;
    requestAnimationFrameId = null;
    birdflaps = [BIRD_UPFLAP_IMAGE_URL, BIRD_MIDFLAP_IMAGE_URL, BIRD_DOWNFLAP_IMAGE_URL];
    beginBirdFlapIndex = 1;
    scores = [SCORE_O, SCORE_1, SCORE_2, SCORE_3, SCORE_4, SCORE_5, SCORE_6, SCORE_7, SCORE_8, SCORE_9];
    scoreInitialIndex = 0;

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

        this.bird.move();
        this.bird.render();
        
        // this.bird.draw();

        // this.animationLogic();

        this.createObstacles();
        this.drawObstacles();
        this.drawScore();
        // setTimeout(() => {
        //     this.requestAnimationFrameId = requestAnimationFrame(this.updateFrame.bind(this));
        // }, 1000 / 200);
    }

    createObstacles() {
        this.frameNo++;
        if (this.frame === 1 || this.onEveryInterval(200)) {
            let height = Math.floor(Math.random() * (MAXIMUM_OBSTACLE_HEIGHT - MINIMUM_OBSTACLE_HEIGHT + 1) + MINIMUM_OBSTACLE_HEIGHT);
            this.obstacles.push(new Obstacle(OBSTACLES_X_POSITON, OBSTACLES_Y_POSITION, OBSTACLE_WIDTH, height, OBSTACLES_UP_IMAGE_URL));
            this.obstacles.push(new Obstacle(OBSTACLES_X_POSITON, GAP_BETWEEN_PIPES + height, OBSTACLE_WIDTH, OBSTACLES_X_POSITON - height - GAP_BETWEEN_PIPES - FOREGROUND_HEIGHT, OBSTACLES_DOWN_IMAGE_URL));
            this.score++;
            if (this.score > 0) {
                this.scoreAudio.play();
            }
        }
    }

    drawBackground() {
        let background = new Component(BACKGROUND_X_POSITION, BACKGROUND_Y_POSITION, BACKGROUND_WIDTH, BACKGROUND_HEIGHT, BACKGROUND_IMAGE_URL);
        background.draw();
    }

    drawForeGround() {
        let foreground = new ForeGround(FOREGROUND_X_POSITION, FOREGROUND_Y_POSITION, FOREGROUND_WIDTH, FOREGROUND_HEIGHT, FOREGROUND_IMAGE_URL);
        foreground.draw();
    }

    drawObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= this.obstacles[i].dx;
            this.obstacles[i].draw();
            if (this.obstacles[i].x < 0) {
                this.obstacles.splice(i, 1);
            }
            this.detectCollision(this.obstacles[i]);
        }
    }

    setInterval() {
        this.interval = setInterval(this.updateFrame.bind(this), 10);
    }

    drawScore() {
        context.font = SCORE_SIZE + ' ' + SCORE_FONT;
        context.fillStyle = SCORE_COLOR;
        this.score < 0 ? context.fillText(0, SCORE_X_POSITION, SCORE_Y_POSITION)
            : context.fillText(this.score, SCORE_X_POSITION, SCORE_Y_POSITION);
    }

    onEveryInterval(n) {
        return (this.frameNo / n) % 1 === 0;
    }

    clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    checkCollision(obstacle) {
        return this.bird.x < obstacle.x + obstacle.width &&
            this.bird.x + this.bird.width > obstacle.x &&
            this.bird.y < obstacle.y + obstacle.height &&
            this.bird.y + this.bird.height > obstacle.y;
    }

    detectCollision(obstacle) {
        if (this.checkCollision(obstacle)) {
            // this.gameOverAudio.play();
            clearInterval(this.interval);
        }
    }

    generateAudio(path) {
        return new Audio(path);
    }
}


document.addEventListener('click', (e) => {
   console.log('mouse is clicked'); 
});

let bird = new Bird(BIRD_X_POSITION, BIRD_Y_POSITION, BIRD_WIDTH, BIRD_HEIGHT, BIRD_IMAGE_URL);
let game = new GameArea(bird);
game.start();