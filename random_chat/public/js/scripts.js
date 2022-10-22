const socket = io('/');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');

  // socket으로 username을 보낸다. new_user라는 이벤트를 등록한 것.
  socket.emit('new_user', username, (data) => {
    console.log(data);
  });
  console.log(username);

  // .on으로 데이터를 받고, 받으면 콟백함수 실행
  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
}

init;
