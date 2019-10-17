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
        this.movementSpeed = 2;
        this.currentDirection = FACING_DOWN;
        this.frameCount = 0;
        this.currentLoopIndex = 0;
        this.initEvent();
    }

    init() {
        this.move();
    }

    draw() {
        context.drawImage(image, this.frameX * WIDTH, this.frameY * HEIGHT,
            WIDTH, HEIGHT, this.canvasX, this.canvasY, SCALED_WIDTH, SCALED_HEIGHT);
    }

    initEvent() {
        window.addEventListener(KEY_DOWN, e => {
            this.keyPresses[e.key] = true;
        }, false);
        window.addEventListener(KEY_UP, e => {
            this.keyPresses[e.key] = false;
        }, false);
    }

    move() {
        let hasMoved = false;
        if (this.keyPresses['w']) {
            this.positionY -= this.movementSpeed;
            this.currentDirection = FACING_UP;
            hasMoved = true;
        } else if (this.keyPresses['s']) {
            this.positionY += this.movementSpeed;
            this.currentDirection = FACING_DOWN;
            hasMoved = true;
        }
        if (this.keyPresses['a']) {
            this.positionX -= this.movementSpeed;
            this.currentDirection = FACING_LEFT;
            hasMoved = true;
        } else if (this.keyPresses['d']) {
            this.positionX += this.movementSpeed;
            this.currentDirection = FACING_RIGHT;
            hasMoved = true;
        }
        if (hasMoved) {
            this.frameCount++;
            if (this.frameCount >= FRAME_LIMIT) {
                this.frameCount = 0;
                this.currentLoopIndex++;
                if (this.currentLoopIndex >= CYCLE_LOOP.length) {
                    this.currentLoopIndex = 0;
                }
            }
        }
        this.canvasX = this.positionX;
        this.canvasY = this.positionY;
        this.frameX = CYCLE_LOOP[this.currentLoopIndex];
        this.frameY = this.currentDirection;
        this.draw();
    }
}