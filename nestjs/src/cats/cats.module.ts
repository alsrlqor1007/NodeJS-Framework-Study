import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
  // 캡슐화: 모듈은 기본적으로 provider를 캡슐화한다. exports 하지 않은 provider는 사용할 수 없다.
  // provider는 원래 캡술화가 되어 있기 때문에 기본적으로는 다른 모듈에서 원래 사용할 수 없다.
})
export class CatsModule {}
