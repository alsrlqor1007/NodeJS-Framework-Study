import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Authguard에는 Strategy를 자동으로 실행해주는 기능이 있다.
export class JwtAuthGuard extends AuthGuard('jwt') {}

/*
JWT
- Header: base64 인코딩 토큰의 타입과 알고리즘
- Payload: base64 인코딩 데이터 (key-value)
- Signature: Header/Payload를 조합하고 비밀키로 서명한 후, base64로 인코딩

https://hudi.blog/self-made-jwt/
*/
