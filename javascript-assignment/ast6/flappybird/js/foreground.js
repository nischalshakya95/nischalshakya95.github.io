class ForeGround extends Component {
    
    dx = 1;

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        return this;
    }

    move() {
        this.x -= this.dx;
        console.log(this.x);
        if (this.x === -(this.width)) {
            this.x = 0;
        }
    }

}