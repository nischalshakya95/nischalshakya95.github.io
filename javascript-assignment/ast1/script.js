let imageCount = 0;
let marginLeft = 0;
let margin = 0;

let wrapper = document.getElementsByClassName('wrapper')[0];
let noOfImage = wrapper.children.length;
let imageWidth = wrapper.children[0].offsetWidth;

let container = document.getElementsByClassName('container')[0];

let prevButton = document.createElement('div');
prevButton.setAttribute('id', 'previous-button');
prevButton.innerHTML = '<';

let nextButton = document.createElement('div');
nextButton.setAttribute('id', 'next-button');
nextButton.innerHTML = ">";

container.append(prevButton);
container.append(nextButton);

prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);

function prev() {
    if (imageCount !== 0) {
        imageCount--;
        margin = (imageWidth * imageCount);
        console.log('prev-margin', margin);
        marginLeft += margin;
        console.log('marginLeft ', marginLeft);
        wrapper.style.marginLeft = `-${marginLeft}px`;
        marginLeft = 0;
    } else {
        imageCount = 0;
        wrapper.style.marginLeft = `${0}px`;
    }
}

function next() {
    if (imageCount === noOfImage - 1) {
        imageCount = 0;
        wrapper.style.marginLeft = `${0}px`;
    } else {
        imageCount++;
        margin = (imageWidth * imageCount);
        marginLeft -= margin;
        wrapper.style.marginLeft = `${marginLeft}px`;
        marginLeft = 0;
    }
}