
// Declare function to animate button on hover
function animateButtonOnHover(button) {
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
  });
}

(function animateButtons() {
  var navBtns = document.getElementsByClassName('nav-btn');

  // Set nav buttons appearance animation
  anime({
    targets: navBtns,
    borderRadius: '20px',
    width: '20%',
    height: '90%',
    color: '#F08200',
    duration: 3000
  });

  // Animate nav buttons on hover
  Array.from(navBtns).forEach(function(button) {
    animateButtonOnHover(button);
  });

  // Animate submit button on hover
  var subBtn = document.getElementsByClassName('sub-btn')[0];

  animateButtonOnHover(subBtn)
})();
