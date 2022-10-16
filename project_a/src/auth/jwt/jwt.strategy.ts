import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에 토큰으로부터 추출
      secretOrKey: 'secret', // secretkey로 디코딩 수행. 유출X. 인증할 때 사용!
      ignoreExpiration: false, // 만료 기간
    });
  }

  async validate(payload) {
    // 클라이언트로부터 받은 payload를 검증하는 로직
  }
}
