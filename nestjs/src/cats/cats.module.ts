import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  // 캡슐화: 모듈은 기본적으로 provider를 캡슐화한다. exports 하지 않은 provider는 사용할 수 없다.
})
export class CatsModule {}
