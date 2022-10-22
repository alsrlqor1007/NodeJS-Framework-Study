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

  constructor() {
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

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user') // 서버에 socket이 들어오게 되면 new_user라는 이벤트를 찾는다.
  handleNewUser(
    @MessageBody() username: string, // 어떤 데이터를 받을건지
    @ConnectedSocket() socket: Socket, // 소켓을 받음. emit과 on 사용
  ): string {
    console.log(username);
    console.log(socket.id); // socket id. 웹 새로고침을 하면 socket은 끊기고 새로운 id를 부여받는다. id를 통해 접속한 클라이언트를 식별한다.

    socket.emit('hello_user', 'hello ' + username);
    return 'Hello world!';
  }
}
