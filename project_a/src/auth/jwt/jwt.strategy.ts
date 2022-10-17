import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from '../../cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에 토큰으로부터 추출
      secretOrKey: 'secret', // secretkey로 디코딩 수행. 유출X. 인증할 때 사용!
      ignoreExpiration: false, // 만료 기간
    });
  }

  async validate(payload: Payload) {
    // 클라이언트로부터 받은 payload를 검증하는 로직
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    // 보안상의 이유로 password를 제외하고 payload를 생성하는 것이 좋다.

    if (cat) {
      return cat; // request.user에 cat이 포함
    } else {
      throw new UnauthorizedException();
    }
  }
}
