(function submitMessage() {
  var textArea = document.getElementsByClassName('text-area')[0];
  var button = document.getElementsByClassName('sub-btn')[0];
  var chat = document.getElementsByClassName('view')[0];
  var text;

  button.addEventListener('click', function() {
    text = textArea.value;
  })
})();
