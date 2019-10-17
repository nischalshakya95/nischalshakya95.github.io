let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

class Sprite {

    constructor() {
        this.image = new Image();
        this.image.src = './sprite.png';
        this.sx = 0;
        this.sy = 0;
        this.sWidth = 24;
        this.sHeight = 24;
        this.dx = 10;
        this.dy = 10;
        this.dWidth = this.sWidth;
        this.dHeight = this.sHeight;
        return this;
    }

    drawImage() {
        context.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dWidth);
    }
}

let s = new Sprite();
console.log(s);
s.drawImage();