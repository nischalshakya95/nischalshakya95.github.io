let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

class Component {
    
    constructor(x, y, width, height, color, type){
        this.x = x;
        this.y = y;
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
    }

}

let component = new Component(200, 0, 10, CANVAS_HEIGHT, 'white', 'line');
let componentTwo = new Component(400, 0, 10, CANVAS_HEIGHT, 'white', 'line');
component.draw();
componentTwo.draw();