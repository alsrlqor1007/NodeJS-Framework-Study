import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param, ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters, UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../pipes/positiveInt.pipe';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  // @UseFilters(HttpExceptionFilter)
  getAllCat() {
    // throw new HttpException({ success: false, message: 'api is broken' }, 401);
    // throw new HttpException('api broken', 401);
    return { cats: 'get all the api' };
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param) {
    // ParseIntPipe로 string type으로 들어온 id를 number type으로 변환
    // 파이프는 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 데이터를 얻을 수 있도록 도와주는 클래스이다.
    // 파이프는 단방향 통신을 위한 용도로 사용된다. 하나의 파이프는 이전 파이프에서 전달된 결과를 입력 값으로 받아 또 다른 결과 값을 내놓는다.
    // id를 받아 ParseIntPipe -> PositiveIntPipe로 파이프를 이룬다.
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
