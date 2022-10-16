import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 email이 있는지 확인
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    // password 검증
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: cat.id };
    // sub: 토큰 고유 식별자

    return {
      // 클라이언트로 다시 발급해줄 수 있는 토큰의 형태가 된다.
      token: this.jwtService.sign(payload),
      // token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
    };
  }
}
