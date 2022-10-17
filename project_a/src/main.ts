import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 문서 접근 보안(사용자 이름과 비밀번호 설정)
  app.use(
    ['/api-doc'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  app.enableCors({
    origin: true, // 개발이 끝난 후 배포 시에는 특정 클라이언트 URL만 명시할 것
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
