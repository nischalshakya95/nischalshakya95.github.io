class Bird extends Component {

    isKeyPressed = true;
    key = null;
    gravity = 0.5;
    gravitySpeed = 0;
    speedX = 0;
    speedY = 0;
    birdflaps = [BIRD_UPFLAP_IMAGE_URL, BIRD_MIDFLAP_IMAGE_URL, BIRD_DOWNFLAP_IMAGE_URL];
    beginBirdFlapIndex = 1;


    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.sound = new Audio('./sound/fly.mp3');
        this.addEvent();
        return this;
    }

    move() {
        this.accelerateUp();
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }

    hitBottom() {
        let rockBottom = (canvas.height - this.height) - 110;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = 0;
        }
    }

    accelerateUp() {
        if (this.key === 32 && this.isKeyPressed) {
            this.gravity = -0.02;
            this.sound.play();
        } else {
            this.gravity = 0.01;
        }
    }

    addEvent() {
        window.addEventListener('keydown', e => {
            this.isKeyPressed = true;
            this.key = e.keyCode;
        });

        window.addEventListener('keyup', () => {
            this.isKeyPressed = false;
        });
    }

    animationLogic(){
        for (let i = this.beginBirdFlapIndex; i < this.birdflaps.length; i++) {
            let image = new Image();
            image.src = this.birdflaps[i];
            console.log(image.src);
            this.draw(this.x, this.y, this.width, this.height, image);
            if (i === 2) {
                this.beginBirdFlapIndex = 0;
            }
        }
    }
}