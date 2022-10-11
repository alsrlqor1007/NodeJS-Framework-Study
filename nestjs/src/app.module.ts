import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// Dependency Injection(의존성 주입)을 명료하게 의존성 관리
// 유지보수도 쉽고 확장성 있는 백엔드 개발이 가능
// 실생활과 유사하게 코드를 짠다(provider, 제품, 등록 등)라는 객체지향 프로그래밍 추구

export class AppModule {}
