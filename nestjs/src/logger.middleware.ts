import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable() // DI 가능
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // NestJS에서의 logger middleware

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(`${req.ip} ${req.method}`, req.originalUrl);

    // response가 완료되었을 때의 이벤트 등록
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });

    next();
  }
}
