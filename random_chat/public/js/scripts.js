const socket = io('/chattings'); // namespace

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler(broadcasting)
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected`);
});

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});

socket.on('disconnect_user', (username) => drawNewChat(`${username}: Bye!`));

//* event callback functions
const handleSubmit = (event) => {
  event.preventDefault(); // 이벤트 버블 발생 방
  const inputValue = event.target.elements[0].value; // submit 텍스트 받기

  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);

    // 화면에 그리기
    drawNewChat(`me: ${inputValue}`);

    // 발송 후 input 칸 비우기
    event.target.elements[0].value = '';
  }
};

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);

const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
    <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  else
    chatBox = `
    <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

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

  // 이벤트 연결
  formElement.addEventListener('submit', handleSubmit); // submit 하는 순간 handleSubmit 실행
}

init();
