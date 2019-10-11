let MAX_WIDTH = 1000;
let MAX_HEIGHT = 600;


(function () {
    function generateRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function Ball(radius, color) {
        this.element = null;
        this.x = null;
        this.y = null;
        this.dx = 1;
        this.dy = 1;
        this.radius = null;
        this.color = null;

        this.init = () => {
            this.radius = radius;
            this.color = color;
            this.parentElement = document.getElementById('app');
            this.element = document.createElement('div');
            this.element.style.height = this.radius + 'px';
            this.element.style.width = this.radius + 'px';
            this.element.style.background = this.color;
            this.element.classList.add('box');
            this.parentElement.appendChild(this.element);
            return this;
        };

        this.init();

        this.setPosition = (x, y) => {
            this.x = x;
            this.y = y;
        };

        this.draw = () => {
            this.element.style.top = this.x + 'px';
            this.element.style.left = this.y + 'px';
            this.move();
        };

        this.move = () => {
            this.x += this.dx;
            this.y += this.dy;
        };

        this.isXWallCollision = () => {
            return this.x + this.dx > MAX_HEIGHT - this.radius || this.x < 0;
        };

        this.reverseXDirection = () => {
            this.dx *= -1;
        };

        this.isYWallCollision = () => {
            return this.y + this.dy > MAX_WIDTH - this.radius || this.y < 0;
        };

        this.reverseYDirection = () => {
            this.dy *= -1;
        };

        this.changeDirection = box => {
            box.dx *= -1;
            box.dy *= -1;
            box.move();

            this.dy *= -1;
            this.dx *= -1;
            this.move();
        };
    }

    function Game(ballCount) {
        this.colors = ['red', 'green', 'blue', 'brown'];
        this.radius = ['10', '20', '30', '40'];
        this.ballCount = 0;
        this.balls = [];
        this.interval = null;
        this.isBallMoving = true;
        this.GAME_ANIMATION_FRAME = 10;

        this.init = () => {
            this.ballCount = ballCount;
            this.createBall();
            this.interval = setInterval(this.moveBalls.bind(this), 5);
            return this;
        };

        this.detectCollision = (ballOne, ballTwo) => {
            let dx = ballOne.x + ballOne.radius - (ballTwo.x + ballTwo.radius);
            let dy = ballOne.y + ballOne.radius - (ballTwo.y + ballTwo.radius);
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (ballOne.radius + ballTwo.radius) / 2;
        };

        this.detectAllCollision = () => {
            for (let k = 0; k < this.balls.length; k++) {
                for (let j = 0; j < this.balls.length; j++) {
                    if (k !== j) {
                        if (this.detectCollision(this.balls[k], this.balls[j])) {
                            this.balls[k].changeDirection(this.balls[j]);
                        }
                    }
                }
            }
        };

        this.moveBalls = () => {
            for (let i = 0; i < this.balls.length; i++) {
                if (this.balls[i].isXWallCollision()) {
                    this.balls[i].reverseXDirection();
                }
                if (this.balls[i].isYWallCollision()) {
                    this.balls[i].reverseYDirection();
                }
                this.balls[i].draw();
            }
            this.detectAllCollision();
        };

        this.playPause = () => {
            if (this.isBallMoving) {
                this.isBallMoving = false;
                clearInterval(this.interval);
            } else {
                this.isBallMoving = true;
                this.interval = setInterval(
                    this.moveBalls.bind(this),
                    this.GAME_ANIMATION_FRAME
                );
            }
        };

        this.createBall = () => {
            let index = 0;
            for (let i = 0; i < this.ballCount; i++) {
                if (index === this.colors.length) {
                    index = 0;
                }
                let ball = new Ball(this.radius[index], this.colors[index]);
                let randomX = generateRandomInt(0, 500);
                let randomY = generateRandomInt(0, 500);
                ball.setPosition(randomX, randomY);
                this.balls.push(ball);
                index += 1;
            }
        };
    }

    let game = new Game(40).init();

    document.addEventListener('click', () => {
        game.playPause();
    });
})();
