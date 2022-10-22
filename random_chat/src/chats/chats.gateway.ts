import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
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
