const detailObj = document.getElementById("detail");
const detailImg = document.getElementById("zoom");
const allImg = document.getElementById("central").getElementsByTagName('img');

function addImgListeners() {
  for (i=0; i < allImg.length; i++) {
    let image = allImg[i];
    image.addEventListener("click", function() {
      showDetail(image.src);
    });
  }
}
addImgListeners();

function showDetail(str) {
  changeImg(str);
  detailObj.style.zIndex = 2;
  detailObj.style.visibility = 'visible';
  detailObj.style.opacity = 1;
}

function changeImg(str) {
  detailImg.src = str;
}

function hideDetail() {
  detailObj.style.zIndex = -1;
  detailObj.style.visibility = 'hidden';
  detailObj.style.opacity = 0;
}

//if the detail is showing, hide it. Otherwise, do nothing.
detailObj.addEventListener("click", function() {hideDetail();});
