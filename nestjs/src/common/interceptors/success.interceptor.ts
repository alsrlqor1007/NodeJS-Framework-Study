import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // pre-controller를 의미

    // const now = Date.now();
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data, // 컨트롤러에서 응답한 데이터
      })),
    );
    // 데이터 형식을 유지하면서 프론트엔드로 응답할 수 있다.
    // post-request 부분

    // 공통된 부분을 Aspect Oriented Perspective로 모듈화를 시킨 것
  }
}
