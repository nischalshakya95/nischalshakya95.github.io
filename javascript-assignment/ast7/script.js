let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

class Helix {

}

class Ball {
    constructor() {
        this.amplitude = 50;
        this.frequency = 0.01;
        this.increament = this.frequency;
        this.x = 100;
        this.y = 75;
        this.radius = 5;
        this.dummyX = 0;
        this.offset = this.y;
        this.radiusAmplitude = this.radius;
        this.speed = 1;
    }

    loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.update();
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    draw() {
        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();   
    }

    update(){
        this.dummyX++;
        this.y = this.amplitude * Math.sin(this.speed * this.dummyX * Math.PI / 180) + this.offset;
        this.radius = this.radiusAmplitude * Math.cos(this.speed * this.dummyX * Math.PI / 180) + this.radiusAmplitude + 1;
    }

}

let h = new Ball();
h.loop();
