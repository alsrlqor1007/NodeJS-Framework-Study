import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'hello world';
  }

  @Get('hello/:id/:name')
  getServiceHello(
    @Req() req: Request,
    @Body() body,
    @Param() param: { id: string; name: string },
  ): string {
    console.log(req);
    return this.appService.getHello();
  }
}
