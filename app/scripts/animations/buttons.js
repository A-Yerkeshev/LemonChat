var navBtns = document.getElementsByClassName('nav-btn');

// Set appearance animation
anime({
  targets: navBtns,
  borderRadius: '30%',
  width: '20%',
  height: '90%',
  color: '#F08200',
  duration: 3000
});

(function animateOnPoint() {
  Array.from(navBtns).forEach(function(button) {
    button.addEventListener('mouseover', function() {
      anime({
        targets: button,
        scale: 1.1,
        color: '#CB4C00',
        duration: 1000
      })
    });
    button.addEventListener('mouseout', function() {
      anime({
        targets: button,
        scale: 1,
        color: '#F08200',
        duration: 1000
      })
    })
  })
})();

