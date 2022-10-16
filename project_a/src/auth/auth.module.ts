import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), // strategy 옵션 설정 가능, session을 사용하지 않을 예정이므로 false 처리
    JwtModule.register({ // JWT를 만들어주는 모듈이라고 생각.
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule),
    // Providers에 CatsRepository를 포함하는 대신! 이렇게 CatsModule에서 export 된 CatsService, CatsRepository 사용 가능!
    // forwardRef()로 순환 종속성 해결 처리
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
