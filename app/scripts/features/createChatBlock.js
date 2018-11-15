function createChatBlock(text, chat) {
  var block = document.createElement('div');

  block.classList.add('chat-block');
  block.innerText = text;

  chat.appendChild(block);
  console.log(chat)
}
