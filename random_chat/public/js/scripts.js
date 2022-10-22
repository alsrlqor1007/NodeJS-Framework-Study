const socket = io('/chattings'); // namespace

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler(broadcasting)
socket.on('user_connected', (username) => {
  console.log(`${username} connected`);
});

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);

function helloUser() {
  const username = prompt('What is your name?');

  // socket으로 username을 보낸다. new_user라는 이벤트를 등록한 것.
  socket.emit('new_user', username, (data) => {
    // 들어온 username을 화면에 만들어 주는 함수
    drawHelloStranger(data);
  });

  // .on으로 데이터를 받고, 받으면 콜백함수 실행
  // socket.on('hello_user', (data) => {
  //   console.log(data);
  // });
}

function init() {
  helloUser();
}

init();
