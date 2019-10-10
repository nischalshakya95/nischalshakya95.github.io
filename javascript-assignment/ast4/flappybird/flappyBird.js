class GameArea {

    constructor() {
        this.canvas = document.createElement('canvas');
    }

    start() {
        this.canvas.width = 480;
        this.canvas.height = 500;
    }
}

new GameArea().start();