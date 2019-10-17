class Game {

    constructor(player){
        this.player = player;
    }

    init() {
        context.clearRect(0,0, canvas.width, canvas.height);
        this.player.move();
        this.player.draw();
        requestAnimationFrame(this.init.bind(this));
    }
}

let image = new Image();
image.src = SPRITE_IMAGE_URL;
let player = new Player(0, 0, 0, 0, image);
new Game(player).init();