/*A guided introduction to the portfolio*/

const initialScreen = document.getElementById('home');
const newScreen = document.getElementById('newSlide');

const newScreenContent = document.getElementById('newText');

const startIntroButton = document.getElementById('start');
startIntroButton.addEventListener("click", initiate);

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

//All hidden Contents
const aboutContent = document.getElementById('aboutContent');
const styleContent = document.getElementById('styleContent');
const genresContent = document.getElementById('genresContent');

var contentArray = [aboutContent, styleContent, genresContent];

//integer showing what position the currently displayed content is in the contentArray
var currentContent;

function initiate() {
  initialScreen.style.visibility= 'hidden';
  newScreen.style.visibility = 'visible';

  newScreenContent.prepend(aboutContent);
  prevButton.style.opacity = .2;
  currentContent = 0;
}

//Moving to the previous slide
function prevSlide() {
  if(currentContent == 0) {
    return;
  }

  nextButton.style.opacity = 1;
  currentContent-=1;
  if (currentContent == 0) {
    prevButton.style.opacity = .2;
  }

  let prevContent = contentArray[currentContent];

  newScreenContent.removeChild(newScreenContent.childNodes[0]);
  newScreenContent.prepend(prevContent);
}

//Moving on to the next slide
function nextSlide() {
  if(currentContent == (contentArray.length - 1)) {
    return;
  }
  prevButton.style.opacity = 1;
  currentContent+=1;
  if (currentContent == (contentArray.length - 1)) {
    nextButton.style.opacity = .2;
  }
  let nextContent = contentArray[currentContent];

  newScreenContent.removeChild(newScreenContent.childNodes[0]);
  newScreenContent.prepend(nextContent);
}
