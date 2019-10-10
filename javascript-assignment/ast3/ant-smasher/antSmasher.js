let MAX_WIDTH = 1000;
let MAX_HEIGHT = 500;

(function () {
    function generateRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function Ant(radius) {
        this.element = null;
        this.x = null;
        this.y = null;
        this.dx = 1;
        this.dy = 1;
        this.radius = null;

        this.init = () => {
            this.radius = radius;
            this.parentElement = document.getElementById('app');
            this.element = document.createElement('div');
            this.element.style.height = this.radius + 'px';
            this.element.style.width = this.radius + 'px';
            this.element.classList.add('ant');
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

        this.changeDirection = ant => {
            ant.dx *= -1;
            ant.dy *= -1;
            ant.move();

            this.dy *= -1;
            this.dx *= -1;
            this.move();
        };
    }

    function Game(antCount) {
        this.antCount = 0;
        this.ants = [];
        this.interval = null;
        this.isAntMoving = true;
        this.GAME_ANIMATION_FRAME = 10;
        this.parentElement = null;
        this.score = 0;

        this.init = () => {
            this.antCount = antCount;
            this.createAnt();
            this.interval = setInterval(this.moveAnt.bind(this), 5);
            this.parentElement = document.getElementById('app');
            return this;
        };

        this.detectCollision = (antOne, antTwo) => {
            let dx = antOne.x + antOne.radius - (antTwo.x + antTwo.radius);
            let dy = antOne.y + antOne.radius - (antTwo.y + antTwo.radius);
            let distance = Math.sqrt(dx * dx + dy * dy);

            return distance < (antOne.radius + antTwo.radius) / 2;
        };

        this.detectAllCollision = () => {
            for (let k = 0; k < this.ants.length; k++) {
                for (let j = 0; j < this.ants.length; j++) {
                    if (k !== j) {
                        if (this.detectCollision(this.ants[k], this.ants[j])) {
                            this.ants[k].changeDirection(this.ants[j]);
                        }
                    }
                }
            }
        };

        this.moveAnt = () => {
            for (let i = 0; i < this.ants.length; i++) {
                if (this.ants[i].isXWallCollision()) {
                    this.ants[i].reverseXDirection();
                }
                if (this.ants[i].isYWallCollision()) {
                    this.ants[i].reverseYDirection();
                }
                this.ants[i].draw();
                this.smash();
            }
            this.detectAllCollision();
        };

        this.playPause = () => {
            if (this.isAntMoving) {
                this.isAntMoving = false;
                clearInterval(this.interval);
            } else {
                this.isAntMoving = true;
                this.interval = setInterval(
                    this.moveAnt.bind(this),
                    this.GAME_ANIMATION_FRAME
                );
            }
        };

        this.createAnt = () => {
            for (let i = 0; i < this.antCount; i++) {
                let ant = new Ant(50);
                let randomX = generateRandomInt(0, 400);
                let randomY = generateRandomInt(0, 400);
                ant.setPosition(randomX, randomY);
                this.ants.push(ant);
            }
        };

        this.smash = () => {
            let ants = document.getElementsByClassName('ant');
            for (let i = 0; i < ants.length; i++) {
                ants[i].onclick = () => {
                    this.ants.splice(i, 1);
                    this.parentElement.removeChild(ants[i]);
                    this.calculateScore();
                    this.displayScore();
                };
            }
        };

        this.calculateScore = () => {
            this.score++;
        };

        this.displayScore = () => {
            document.getElementById('score').innerHTML = 'Score: ' + this.score;
        };
    }

    new Game(20).init();
})();
