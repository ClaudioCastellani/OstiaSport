const zoomContainers = document.querySelectorAll('.zoom-container');

// Itera su tutti gli elementi zoom-container
zoomContainers.forEach(zoomContainer => {
  zoomContainer.addEventListener('mousemove', function(e) {
    const { left, top, width, height } = this.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;

    this.querySelector('.zoom-image').style.transformOrigin = `${x}% ${y}%`;
  });
});