function createChatBlock(text, view) {
  var block = document.createElement('div');

  block.classList.add('chat-block');
  block.innerHtml = text;

  view.appendChild(block);
}
