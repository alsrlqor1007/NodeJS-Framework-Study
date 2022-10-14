import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

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

- providers에 DI 주입을 위해 모든 Service와 Repository들을 하나씩 넣어주는 것에는 단점이 있다.
- 모듈들이 모두 분리가 되어 있는데 이를 무시하고 각각 직접 provider에 주입한다면 단일책임원칙에 위배된다고 할 수 있다.
- 예를 들어 CatsService를 별도로 만들었는데, 은닉화가 되어 있어서 다른 모듈에서 접근을 못한다.
- 접근이 가능하도록 exports 처리해주면 사용하고자 하는 타 모듈에서 providers에 추가해줄 필요 없이 exports 된 것을 사용할 수 있다.
- providers에는 해당 모듈에서 만든 service나 gateway 등을 넣는 것이 좋고, 다른 모듈에서 만든 provider는 exports를 통해 public으로 만들어 사용한다.
*/
export class AppModule implements NestModule {
  // implements NestModule: 인터페이스를 의미.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    // consumer에게 LoggerMiddleware 제공
    // cats 라우터에 바인딩. '*'라면 전체 엔드포인트에 대해 로거가 실행.
  }
}
