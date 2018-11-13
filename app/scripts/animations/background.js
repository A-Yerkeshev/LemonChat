(function animateBackground() {
  setInterval(function () {
    var circle = document.createElement('div');
    var innerCircle = document.createElement('div');

    circle.classList.add('circle');
    innerCircle.classList.add('inner-circle');

    var size = Math.random()*30+20;
    var posx = Math.random() * window.innerWidth;
    var posy = Math.random() * window.innerHeight;

    circle.style.left = posx + 'px';
    circle.style.top = posy + 'px';
    innerCircle.style.left = posx + 'px';
    innerCircle.style.top = posy + 'px';

    document.body.appendChild(circle);
    document.body.appendChild(innerCircle);

    anime({
      targets: circle,
      width: size + '%',
      height: size + '%',
      left: (posx-window.innerWidth*size/200) + 'px',
      top: (posy-window.innerHeight*size/200) + 'px',
      duration: 20000
    });

    anime({
      targets: innerCircle,
      width: size + '%',
      height: size + '%',
      left: (posx-window.innerWidth*size/200) + 'px',
      top: (posy-window.innerHeight*size/200) + 'px',
      duration: 40000
    });

    anime({
      targets: innerCircle,
      opacity: 0,
      delay: 6000,
      duration: 20000
    });

    anime({
      targets: circle,
      opacity: 0,
      delay: 6000,
      duration: 14000
    })

    setTimeout(function() {
      document.body.removeChild(circle);
      document.body.removeChild(innerCircle);
    }, 20000)
  }, 5000)
})();

