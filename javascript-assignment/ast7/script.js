let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

class Helix {

    balls = [];

    constructor() {
        this.initialX = 100;
        this.initialY = 75;
        this.create();
    }

    loop(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    create() {
        for (let i = 0; i < 5; i++) {
            let ball = new Ball(this.initialX, this.initialY);
            this.initialY += 30;
            this.balls.push(ball);
        }
    }

    draw() {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
            this.balls[i].draw();
        }
    }

}

class Ball {

    constructor(x, y) {
        this.amplitude = 50;
        this.frequency = 0.01;
        this.increament = this.frequency;
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.dummyX = 0;
        this.offset = this.y;
        this.radiusAmplitude = this.radius;
        this.speed = 1;
    }

    draw() {
        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    update() {
        this.dummyX++;
        this.y = this.amplitude * Math.sin(this.speed * this.dummyX * Math.PI / 180) + this.offset;
        this.radius = this.radiusAmplitude * Math.cos(this.speed * this.dummyX * Math.PI / 180) + this.radiusAmplitude + 1;
    }

}

let h = new Helix();
h.loop();