import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { UserEntity } from './users/users.entity'
import { UsersModule } from './users/users.module'
import { BlogsModule } from './blogs/blogs.module'
import { TagsModule } from './tags/tags.module'
import { VisitorsModule } from './visitors/visitors.module'
import { ProfilesModule } from './profiles/profiles.module'
import { ProfileEntity } from './profiles/profiles.entity'
import { BlogEntity } from './blogs/blogs.entity'
import { VisitorEntity } from './visitors/visitors.entity'
import { TagEntity } from './tags/tags.entity'

const typeOrmModuleOptions = {
  useFactory: async (
    // useFactory: 함수에 대해서 모듈을 설정
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DB_HOST'), // process.env.DB_HOST
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, ProfileEntity, BlogEntity, VisitorEntity, TagEntity],
    synchronize: true, //! set 'false' in production, 개발 단계에서만 true로 한다.
    autoLoadEntities: true, // 자동으로 엔터티 로드
    logging: true, // 개발환경에서만 권장
    keepConnectionAlive: true, // 연결할 때까지 계속 시도
  }),
  inject: [ConfigService],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // 환경변수가 들어오면 환경변수에 대한 유효성 검사를 실행하는 옵션
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(5000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BlogsModule,
    TagsModule,
    VisitorsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
