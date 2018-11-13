(function animateBackground() {
  setInterval(function () {
    // Initialize circles
    var circle = document.createElement('div');
    var innerCircle = document.createElement('div');

    // Add CSS class to circles
    circle.classList.add('circle');
    innerCircle.classList.add('inner-circle');

    // Initialize random size and position
    var size = Math.random()*30+20;
    var posx = Math.random() * window.innerWidth;
    var posy = Math.random() * window.innerHeight;

    // Append positions as CSS property
    circle.style.left = posx + 'px';
    circle.style.top = posy + 'px';
    innerCircle.style.left = posx + 'px';
    innerCircle.style.top = posy + 'px';

    // Add circles to the DOM
    document.body.appendChild(circle);
    document.body.appendChild(innerCircle);

    // Animate appearance
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

    // Animate disappearance
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

    // Initialize new circle each 5 seconds. Remove after 20 seconds
    setTimeout(function() {
      document.body.removeChild(circle);
      document.body.removeChild(innerCircle);
    }, 20000)
  }, 5000)
})();

