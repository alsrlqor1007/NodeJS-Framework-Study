import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { map, Observable } from 'rxjs'

@Injectable()
export class OnlyPrivateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const user = request.user
    if (user) return next.handle().pipe(map((data) => data))
    else throw new UnauthorizedException('인증에 문제가 있습니다.')
  }
}

// auth guard를 거친 후 user를 받는다.
// user 데이터가 존재하면 해당하는 데이터를 반환한다. 없으면 에러 반환.
