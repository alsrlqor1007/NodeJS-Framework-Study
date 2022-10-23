import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatting } from './models/chattings.model';
import { Model } from 'mongoose';
import { Socket as SocketModel } from './models/sockets.model';

@WebSocketGateway({ namespace: 'chattings' }) // namespace: controller와 비슷한 역할. 공간 분리
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // Lifecycle hook
  // OnGatewayInit: 초기화될 때마다 반드시 afterInit() 실행하는 인터페이스(규격, 사양서)
  // OnGatewayConnection: handleConnection()을 반드시 구현해야 한다는 인터페이스.
  // handleConnection(): 소켓 연결될 때 실행
  // OnGatewayDisconnect: handleDisconnect()을 반드시 구현해야 한다는 인터페이스. 소켓이 끊길 때.

  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {
    this.logger.log('constructor');
  }

  // gateway가 실행될 때 constructor 다음 가장 먼저 실행되는 함수
  afterInit() {
    this.logger.log('init');
  }

  // socket 연결이 되는 순간 실행되는 함수
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // socket.id를 받고 해당하는 sockets.model에 id === socket.id인 user를 가져오고 해당하는 user를 제거한다.
    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.delete();
    }
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user') // 서버에 socket이 들어오게 되면 new_user라는 이벤트를 찾는다.
  async handleNewUser(
    @MessageBody() username: string, // 어떤 데이터를 받을건지
    @ConnectedSocket() socket: Socket, // 소켓을 받음. emit과 on 사용
  ) {
    // console.log(username);
    // console.log(socket.id); // socket id. 웹 새로고침을 하면 socket은 끊기고 새로운 id를 부여받는다. id를 통해 접속한 클라이언트를 식별한다.

    // socket.emit('hello_user', 'hello ' + username);

    /*
    username을 받고 해당하는 sockets.model에 username이 있는지 중복체크
    중복되었으면 랜덤 숫자를 추가해 username으로 저장. id에는 socket.id 저장.
    중복되지 않았으면 그대로 username으로 저장. id에는 socket.id 저장.
    */

    const exist = await this.socketModel.exists({ username: username });

    if (exist) {
      username = `${username}_${Math.floor(Math.random() * 100)}`;
      await this.socketModel.create({
        id: socket.id,
        username,
      });
    } else {
      await this.socketModel.create({
        id: socket.id,
        username,
      });
    }

    // username을 DB에 저장
    // 브로드캐스팅. 연결된 모든 socket에 데이터를 전송한다.
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // socket.id를 받고 해당하는 sockets.model에 id === socket.id인 user를 가져온다.
    // chattings.model에 해당하는 user와 chat을 저장한다.

    const socketObj = await this.socketModel.findOne({ id: socket.id });

    await this.chattingModel.create({
      user: socketObj,
      chat: chat,
    });

    // 브로드캐스팅으로 모든 socket에 채팅 내용을 모두 보낸다.
    socket.broadcast.emit('new_chat', { chat, username: socketObj.username });
  }
}
