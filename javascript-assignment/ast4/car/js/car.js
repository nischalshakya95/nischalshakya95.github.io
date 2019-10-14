let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

class GameArea {

    constructor(car) {
        this.car = car;
        this.updateFrame();
        return this;
    }

    updateFrame() {
        this.clear();
        this.drawLines();
        this.car.move();
        this.car.draw();
        requestAnimationFrame(this.updateFrame.bind(this));
    }

    clear() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    drawLines() {
        let lineOne = new Component(200, 0, 5, CANVAS_HEIGHT, 'white', 'line');
        let lineTwo = new Component(400, 0, 5, CANVAS_HEIGHT, 'white', 'line');
        lineOne.draw();
        lineTwo.draw();
    }
}

class Component {

    constructor(x, y, width, height, color, type) {
        this.setInitialPosition(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        return this;
    }

    draw() {
        if (this.type === 'line') {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.type === 'car') {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }


    setInitialPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Car extends Component {

    isKeyPressed = true;
    key = null;
    dx = 0;
    dy = 0;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        this.addEvent();
        return this;
    }

    move() {
        if (this.isKeyPressed && this.key === 'ArrowRight') {
            this.dx += 100;
        }
        if (this.isKeyPressed && this.key === 'ArrowLeft') {
            this.dx -= 100;
        }
        this.updatePos();
    }

    updatePos() {
        this.x += this.dx;
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

let car = new Car(250, 700, 100, 100, 'red', 'car');
let gameArea = new GameArea(car);