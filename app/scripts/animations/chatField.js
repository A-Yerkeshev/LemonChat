// Increase opacity of chat field on focus and decrease on blur
(function opacityOnFocus() {
  var chatField = document.getElementsByClassName('chat-field')[0];
  var textArea = document.getElementsByClassName('text-area')[0];

  textArea.addEventListener('focus', function() {
    chatField.style.opacity = 0.9;
  });

  textArea.addEventListener('blur', function() {
    chatField.style.opacity = 0.5;
  })
})();
