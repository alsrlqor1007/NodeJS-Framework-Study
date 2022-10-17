import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { CurrentUser } from '../common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  // getCurrentCat(@Req() req: Request) {
  getCurrentCat(@CurrentUser() cat) {
    // 커스텀 데코레이터로 한 단계 더 추상화. 높은 인터페이스 제공.
    return cat;
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  async signUp(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // API를 만들어주지 않아로 클라이언트에서 저장되어 있는 JWT를 제거하면 로그아웃 처리가 된다.
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  logOut() {
    return 'logout';
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats'))) // 이미지를 보내는 클라이언트의 fieldName과 일치해야 함
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }

  @Get('all')
  @ApiOperation({ summary: '모든 고양이 가져오기' })
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
