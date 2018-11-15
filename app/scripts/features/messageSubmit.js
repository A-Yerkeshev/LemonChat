(function submitMessage() {
  var textArea = document.getElementsByClassName('text-area')[0];
  var button = document.getElementsByClassName('sub-btn')[0];
  var chat = document.getElementsByClassName('chat')[0];
  var text;

  // Submit text on click
  button.addEventListener('click', function() {
    text = textArea.value;
    createChatBlock(text, chat);
  })

})();
