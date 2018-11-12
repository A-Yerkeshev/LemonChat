(function animateBackground() {
  setInterval(function () {
    var circle = document.createElement('div');

    circle.classList.add('circle');

    var size = (Math.random()*30+10).toFixed();
    var posx = (Math.random() * window.innerWidth - size * 2).toFixed();
    var posy = (Math.random() * window.innerHeight - size * 2).toFixed();

    circle.style.width = size + '%';
    circle.style.height = size + '%';
    circle.style.left = posx + 'px';
    circle.style.top = posy + 'px';

    document.body.appendChild(circle);

    anime({
      targets: circle,
      width: size * 2 + '%',
      height: size * 2 + '%',
      duration: 10000,
 //     easing: 'easeOutBack'
    })

    setTimeout(function() {
      document.body.removeChild(circle)
    }, 10000)
  }, 5000)
})();

