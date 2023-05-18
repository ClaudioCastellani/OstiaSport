var carouselInner = document.querySelector('.carousel-inner');
var carouselWidth = carouselInner.offsetWidth;
var imageWidth = carouselWidth / 3;
var currentIndex = 0;
var intervalId;

function slideToIndex(index) {
  carouselInner.style.transform = 'translateX(' + (-index * imageWidth) + 'px)';
}

function startCarousel() {
  intervalId = setInterval(function() {
    currentIndex = (currentIndex + 1) % 3;
    slideToIndex(currentIndex);
  }, 3000);
}

function stopCarousel() {
  clearInterval(intervalId);
}

carouselInner.addEventListener('mouseover', stopCarousel);
carouselInner.addEventListener('mouseout', startCarousel);

startCarousel();