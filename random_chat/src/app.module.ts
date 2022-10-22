import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 환경변수 global로 사용
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, // mongodb url을 읽을 수 있도록 설정
      useUnifiedTopology: true, // 최신 mongodb 드라이버 엔진을 사용하도록 설정
      // useCreateIndex: true,
      // useFindAndModify: false,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure() {
    const DEBUG = process.env.MODE === 'dev' ? true : false;
    mongoose.set('debug', DEBUG);
  }
}
