import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
/*
- Dependency Injection(의존성 주입)을 명료하게 의존성 관리
- 유지보수도 쉽고 확장성 있는 백엔드 개발이 가능
- 실생활과 유사하게 코드를 짠다(provider, 제품, 등록 등)라는 객체지향 프로그래밍 추구

- imports의 모듈에서 export를 한 것들을 app.module에서 사용할 수 있다.
- 캡슐화: 모듈은 기본적으로 provider를 캡슐화한다. exports 하지 않은 provider는 사용할 수 없다.
*/
export class AppModule {}
