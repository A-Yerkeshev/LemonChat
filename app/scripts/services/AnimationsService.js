angular.module('LemonChat')
  .service('AnimationsService', function() {

    // Background animation
    this.animateBackground = function () {
      setInterval(function () {
        // Initialize circles
        var circle = document.createElement('div');
        var innerCircle = document.createElement('div');

        // Add CSS class to circles
        circle.classList.add('circle');
        innerCircle.classList.add('inner-circle');

        // Initialize random size and position
        var size = Math.random()*100;
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
          scale: size,
          duration: 20000
        });

        anime({
          targets: innerCircle,
          scale: size,
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
    };

    // Buttons animation
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
          color: '#EE6500',
          duration: 1000
        })
      });
    };

    this.animateButtons = function () {
      var buttons = document.getElementsByClassName('button');
      var navBtns = document.getElementsByClassName('nav-btn');

      // Set nav buttons appearance animation
      anime.timeline()
        .add({
          targets: navBtns[1],
          right: '0em',
          easing: 'easeOutCubic',
          duration: 500
        })
        .add({
          targets: navBtns[2],
          right: '0em',
          easing: 'easeOutCubic',
          duration: 500
        })
        .add({
          targets: navBtns[0],
          right: '0em',
          easing: 'easeOutCubic',
          duration: 500
        });

      // Animate buttons on hover
      Array.from(buttons).forEach(function(button) {
        animateButtonOnHover(button);
      });
    };

    // Chat field animations
    // Declare event opacity listener
    function addOpacityListeners(elem, chatField) {
      elem.addEventListener('focus', function() {
        chatField.style.opacity = 0.9;
      });

      elem.addEventListener('blur', function() {
        chatField.style.opacity = 0.5;
      })
    }

    // Increase opacity of chat field on focus and decrease on blur
    this.animateChat = function () {
      var chatField = document.getElementsByClassName('chat-field')[0];
      var textArea = document.getElementsByClassName('text-area')[0];
      var subButton = document.getElementsByClassName('sub-btn')[0];

      // Bind listeners to chat field elements
      addOpacityListeners(textArea, chatField);
      addOpacityListeners(subButton, chatField)
    };

    // Messages animations
    // Animate message appearance
    this.animateMessage = function(message) {
      message.style.display = 'inline-block';
      anime({
        targets: message,
        right: '0em',
        easing: 'linear',
        duration: 200
      });
    }
  })
