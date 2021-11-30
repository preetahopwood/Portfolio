/*Carousel for images for project detail page.*/

const allImages = document.getElementById('carousel');
const allImagesChildren = allImages.childNodes;
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

nextButton.addEventListener("click", function() {next()});
prevButton.addEventListener("click", function(){prev()});

//removing all empty text nodes
function removeEmpty() {
  for (i = 0; i < allImagesChildren.length; i++) {
    if (allImagesChildren[i].nodeName == "#text") {
      allImagesChildren[i].remove();
    }
  }
}
removeEmpty();

curImageIndex = 0;

//carousel controls
function next() {
  let nextImageIndex;
  if (curImageIndex == (allImages.childElementCount - 1)) {
    nextImageIndex = 0;
  } else {
    nextImageIndex = curImageIndex + 1;
  }

  let curImage = allImages.childNodes[curImageIndex];
  let nextImage = allImages.childNodes[nextImageIndex];

  curImage.style.opacity = "0";
  nextImage.style.opacity = "1";

  curImageIndex = nextImageIndex;
}

function prev() {
  let nextImageIndex;
  if (curImageIndex == 0) {
    nextImageIndex = allImages.childElementCount - 1;
  } else {
    nextImageIndex = curImageIndex - 1;
  }

  let curImage = allImages.childNodes[curImageIndex];
  let nextImage = allImages.childNodes[nextImageIndex];

  curImage.style.opacity = "0";
  nextImage.style.opacity = "1";

  curImageIndex = nextImageIndex;
}

/*Image replacement for links*/
const links = document.getElementsByClassName('link'); //array

function addLinkEventListeners() {
  for (i=0; i < links.length; i++) {
    let l = links[i];
    let lImage = links[i].getElementsByTagName('img')[0];
    let lstrings = lImage.src.split('_');

    l.addEventListener("mousedown", function() {
      toFill(lImage, lstrings[0]);
    });
    l.addEventListener("mouseup", function() {
      toOutline(lImage, lstrings[0]);
    });
  }
}

addLinkEventListeners();

function toFill(lImage, str) {
  lImage.src = str + "_fill.svg";
}

function toOutline(lImage, str) {
  lImage.src = str + "_outline.svg";
}
