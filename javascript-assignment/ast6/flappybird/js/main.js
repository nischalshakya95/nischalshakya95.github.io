document.addEventListener('click', () => {

    let splashScreen = document.getElementById('background-splash');
    splashScreen.style.display = 'none';

    canvas.style.display = 'inline-block';

    let bird = new Bird(BIRD_X_POSITION, BIRD_Y_POSITION, BIRD_WIDTH, BIRD_HEIGHT, BIRD_IMAGE_URL);
    let game = new GameArea(bird);
    game.start();
});