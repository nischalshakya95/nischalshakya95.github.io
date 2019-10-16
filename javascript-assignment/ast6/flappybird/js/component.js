class Component {
    dx = 1;
    dy = 1;

    constructor(x, y, width, height, color) {
        this.setInitialPosition(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = new Image();
        this.image.src = this.color;
        return this;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    setInitialPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}
