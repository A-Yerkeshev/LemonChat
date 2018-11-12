(function animateBackground() {
  setInterval(function () {
    var circle = document.createElement('div');

    circle.classList.add('circle');

    var size = (Math.random()*10).toFixed();
    var posx = (Math.random() * window.innerWidth).toFixed();
    var posy = (Math.random() * window.innerHeight).toFixed();

    circle.style.width = size + '%';
    circle.style.height = size + '%';
    circle.style.left = posx + 'px';
    circle.style.top = posy + 'px';

    document.body.appendChild(circle);

    setTimeout(function() {
      document.body.removeChild(circle)
    }, 5000)
  }, 1000)
})();

