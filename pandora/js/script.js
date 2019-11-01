let numbersClass = document.getElementsByClassName("bg-number");
let numbers = numbersClass[0].children;
let imagesClass = document.getElementsByClassName("images");
let image = imagesClass[0].children;
let slideIndex = 1;

showSlides(slideIndex);

function next(){
    showSlides(slideIndex + 1);
}

function prev() {
    showSlides(slideIndex - 1);
}

function currentSlides(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  
  slideIndex = n;

  if (slideIndex > image.length){
    slideIndex = 1;
  }

  if (slideIndex === 0) {
    slideIndex = image.length;
  }
  
  for (let i = 0; i < image.length; i++) {
    image[i].className = image[i].className.replace(' display-block', '');
  }

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].className = numbers[i].className.replace(' active', '');
  }
  numbers[slideIndex - 1].className += ' active';
  image[slideIndex - 1].className += ' display-block';
}
