window.onload = function () {
    let imageFramePoint = [0, 1, 2];
    let imageFrameIndex = 0;
    let frameCount = 0;

    let dx = 40;
    let dy = 40;


    let width = 35;
    let height = 24;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');

    let img = new Image();
    img.src = 'sprite.png';
    img.onload = function (e) {

        function drawImage(frameX, frameY, canvasX, canvasY) {
            context.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, width, height);
        }

        function step() {
            frameCount++;
            if (frameCount < 10) {
                requestAnimationFrame(step);
                return;
            }
            frameCount = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawImage(imageFramePoint[imageFrameIndex], 0, dx, dy);
            imageFrameIndex++;
            if (imageFrameIndex >= imageFramePoint.length) {
                imageFrameIndex = 0;
            }
            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }
}