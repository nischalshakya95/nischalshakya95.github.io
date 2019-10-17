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
        this.hasMoved = false;
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
        this.hasMoved = false;
        if (this.keyPresses['w']) {
            this.moveUp();
        } else if (this.keyPresses['s']) {
            this.moveDown();
        }
        if (this.keyPresses['a']) {
            this.moveLeft();
        } else if (this.keyPresses['d']) {
            this.moveRight();
        }
        this.isPlayerMove();
        this.update();
        this.draw();
    }

    moveUp() {
        this.positionY -= this.movementSpeed;
        this.currentDirection = FACING_UP;
        this.hasMoved = true;
    }

    moveDown() {
        this.positionY += this.movementSpeed;
        this.currentDirection = FACING_DOWN;
        this.hasMoved = true;
    }

    moveRight() {
        this.positionX += this.movementSpeed;
        this.currentDirection = FACING_RIGHT;
        this.hasMoved = true;
    }

    moveLeft() {
        this.positionX -= this.movementSpeed;
        this.currentDirection = FACING_LEFT;
        this.hasMoved = true;
    }

    isPlayerMove() {
        if (this.hasMoved) {
            this.frameCount++;
            if (this.frameCount >= FRAME_LIMIT) {
                this.frameCount = 0;
                this.currentLoopIndex++;
                if (this.currentLoopIndex >= CYCLE_LOOP.length) {
                    this.currentLoopIndex = 0;
                }
            }
        }
    }

    update() {
        this.canvasX = this.positionX;
        this.canvasY = this.positionY;
        this.frameX = CYCLE_LOOP[this.currentLoopIndex];
        this.frameY = this.currentDirection;
    }
}