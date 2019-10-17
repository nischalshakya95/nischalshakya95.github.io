let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

class Game {

    constructor(player){
        this.player = player;
    }

    init() {
        context.clearRect(0,0, canvas.width, canvas.height);
        this.player.init();
        requestAnimationFrame(this.init.bind(this));
    }
}

let image = new Image();
image.src = SPRITE_IMAGE_URL;
let player = new Player(0, 0, 0, 0, image);
new Game(player).init();