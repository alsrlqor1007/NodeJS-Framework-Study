import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css 파일 등 serving 가능하도록
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // 사용할 템플릿 엔진 뷰 위치. 템플릿 엔진이란 HTML을 렌더링 할 수 있는 엔진
  app.setViewEngine('hbs'); // 사용하는 뷰 엔진

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
