angular.module('LemonChat')
  .service('AnimationsService', function($compile, UsersService) {

    // Declare function to animate elements on hover
    function animateOnHover(element, scale, colorOver, colorOut) {
      element.addEventListener('mouseover', function() {
        anime({
          targets: element,
          scale: scale,
          color: colorOver,
          duration: 1000
        })
      });
      element.addEventListener('mouseout', function() {
        anime({
          targets: element,
          scale: 1,
          color: colorOut,
          duration: 1000
        })
      });
    };

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
    // Animate nav buttons
    function appearNavButtons(buttons) {
      // Set nav buttons appearance animation
      var time = 500;
      for (i=buttons.length-1; i>=0; i--) {
        anime({
          targets: buttons[i],
          right: '0%',
          easing: 'easeOutQuart',
          duration: time
        });
        time += 500;
      }
    };

    function disappearButtons(buttons) {
      var time = 500;
      for (i=0; i<buttons.length; i++) {
        anime({
          targets: buttons[i],
          right: '100%',
          easing: 'easeOutQuart',
          duration: time
        });
        time += 500;
      }
    };

    function hoverNavButtons(buttons) {
      // Animate buttons on hover
      Array.from(buttons).forEach(function(button) {
        animateOnHover(button, 1.1, '#CB4C00', '#EE6500');
      });
    }
    this.animateNavButtons = function(buttons) {
      appearNavButtons(buttons);
      hoverNavButtons(buttons);
    };

    // Chat field animations
    // Declare event opacity listener
    function addOpacityListeners(elem, chatField) {
      elem.addEventListener('focus', function() {
        chatField.style.opacity = 0.9;
      });

      elem.addEventListener('blur', function() {
        chatField.style.opacity = 0.5;
      });
    };

    // Increase opacity of chat field on focus and decrease on blur
    this.animateChat = function () {
      var chatField = document.getElementsByClassName('chat-field')[0];
      var textArea = document.getElementsByClassName('text-area')[0];
      var subBtn = document.getElementsByClassName('sub-btn')[0];

      // Bind listeners to chat field elements
      addOpacityListeners(textArea, chatField);
      addOpacityListeners(subBtn, chatField);

      // Animate submit button on hover
      animateOnHover(subBtn, 1.1, '#CB4C00', '#EE6500');
    };

    //Appear and disappear chat
    this.appearChat = function() {
      var chatField = document.getElementsByClassName('chat-field')[0];
      chatField.style.display = 'block';
      anime({
        targets: chatField,
        bottom: '0em',
        easing: 'easeOutCubic',
        duration: 1000
      })
    };

    this.disappearChat = function() {
      var chatField = document.getElementsByClassName('chat-field')[0];
      chatField.style.display = 'none';
      chatField.style.bottom = '-15em';
    };

    // Messages animations
    // Animate message appearance
    this.animateMessage = function (message) {
      message.style.display = 'inline-block';
      anime({
        targets: message,
        right: '0em',
        easing: 'linear',
        duration: 200
      });
    };

    // Animate conversations on hover
    this.animateList = function(list) {
      Array.from(list).forEach(function (item) {
        animateOnHover(item, 1, '#FF2A00', '#8E1400')
      });
    };

    // Add hover animation to view buttons
    this.animateViewButtons = function() {
      setTimeout(function() {
        var view = document.getElementsByClassName('view')[0];
        var buttons = view.getElementsByClassName('button');

        Array.from(buttons).forEach(function (button) {
          animateOnHover(button, 1.1, '#CB4C00', '#EE6500');
        })
      }, 500);
    };

    // Appear profile image selection panel
    this.appearImageSelectPanel = function(scope) {
      // Check if panel exists
      var panel = document.getElementsByClassName('prof-img-panel')[0];

      // If it does not - create it
      if (panel == null) {
        var imageBox = document.getElementsByClassName('prof-img-box')[0];

        // Images list shall be retrieved from service in the future
        var images = ['unknown.png', 'lemon.png', 'orange.png', 'grapefruit.png',
        'lime.png'];
        var panel = angular.element('<div class="prof-img-panel"></div>');

        // Create clickable element from each image in the list
        images.forEach(function(image) {
          var elem = angular.element('<img class="profile-image" src="/images/'
            + image + '" ng-click="changeProfileImage(' + "'" + image + "'" + ')">')
          panel.append($compile(elem)(scope));
        });

        // Add close button
        var close = angular.element(`<button class="close" ng-click="closePanel()">
          </button>`);

        panel.append($compile(close)(scope));

        // Append the panel
        angular.element(imageBox).append(panel);

        anime({
          targets: panel.get(0),
          left: '0%',
          easing: 'easeOutQuart',
          duration: 1000
        });

      // Otherwise just display it
      } else {
        panel.style.display = 'inline-flex';
        anime({
          targets: panel,
          left: '0%',
          easing: 'easeOutQuart',
          duration: 1000
        });
      }
    };

    // Close panel function
    this.closePanel = function() {
      var panel = document.getElementsByClassName('prof-img-panel')[0];

      anime({
        targets: panel,
        left: '-100%',
        easing: 'easeOutQuart',
        duration: 1000
      });
      setTimeout(function() {
        panel.style.display = 'none'
      }, 1000);
    };

    //Replace log in and register buttons with log out button
    this.replaceLogButtons = function(set) {
      var logins = $('.log-btn');
      var logout = $('.logout');

      if (set == 'logout') {
        anime({
          targets: logins.get(),
          scale: 0,
          easing: 'easeOutQuart',
          duration: 500
        });

        setTimeout(function() {
          logins.hide();
          logout.show();

          anime({
            targets: logout.get(),
            scale: 1,
            easing: 'easeOutQuart',
            duration: 500
          });
        }, 500);
      };

      if (set == 'login') {
        anime({
          targets: logout.get(),
          scale: 0,
          easing: 'easeOutQuart',
          duration: 500
        });

        setTimeout(function() {
          logins.show();
          logout.hide();

          anime({
            targets: logins.get(),
            scale: 1,
            easing: 'easeOutQuart',
            duration: 500
          });
        }, 500);
      };
    };

    this.disappearUsrButtons = function() {
      var buttons = $('.usr-btn').get();

      disappearButtons(buttons);
    };

  })
