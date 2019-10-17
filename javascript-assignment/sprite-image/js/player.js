let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

class Player {

    constructor(frameX, frameY, canvasX, canvasY, image) {
        this.frameX = frameX;
        this.frameY = frameY;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.image = image;
        this.positionX = 0;
        this.positionY = 0;
        this.keyPresses = {};
        this.movementSpeed = 1;
        this.initEvent();
    }

    draw() {
        context.drawImage(image, this.frameX * WIDTH, this.frameY * HEIGHT,
            WIDTH, HEIGHT, this.canvasX, this.canvasY, SCALED_WIDTH, SCALED_HEIGHT);
    }

    initEvent() {
        window.addEventListener('keydown', e => {
            this.keyPresses[e.key] = true;
        }, false);
        window.addEventListener('keyup', e => {
            this.keyPresses[e.key] = false;
        }, false);
    }

    move() {
        if (this.keyPresses['w']) {
            this.positionY -= this.movementSpeed;
        } else if (this.keyPresses['s']) {
            this.positionY += this.movementSpeed;
        }
        if (this.keyPresses['a']) {
            this.positionX -= this.movementSpeed;
        } else if (this.keyPresses['d']) {
            this.positionX += this.movementSpeed;
        }
        this.canvasX = this.positionX;
        this.canvasY = this.positionY;
    }
}