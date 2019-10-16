class Bird {

    isKeyPressed = true;
    key = null;
    gravity = 0.5;
    gravitySpeed = 0;
    speedX = 0;
    speedY = 0;
    birdFrameX = [0, 35, 70];
    frameIndex = 0;

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = new Image();
        this.image.src = this.color;
        this.sound = new Audio('./sound/fly.mp3');
        this.addEvent();
        return this;
    }

    render() {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    move(interval) {
        this.accelerateUp();
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom(interval);
    }

    hitBottom(interval) {
        let rockBottom = (canvas.height - this.height) - 110;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = 0;
            let sound = new Audio('./sound/game-over.mp3');
            sound.play();
            clearInterval(interval);
        }
    }

    accelerateUp() {
        if (this.key === 32 && this.isKeyPressed) {
            this.gravity = -0.02;
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