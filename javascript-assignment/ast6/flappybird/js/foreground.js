class ForeGround extends Component {

    constructor(x, y, width, height, color, type) {
        super(x, y, width, height, color, type);
        return this;
    }

    move() {
        this.x -= this.dx;
        if (this.x === -(this.width)) {
            this.x = 0;
        }
    }

}