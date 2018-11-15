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
(function opacityOnFocus() {
  var chatField = document.getElementsByClassName('chat-field')[0];
  var textArea = document.getElementsByClassName('text-area')[0];
  var subButton = document.getElementsByClassName('sub-btn')[0];

  // Bind listeners to chat field elements
  addOpacityListeners(textArea, chatField);
  addOpacityListeners(subButton, chatField)
})();
