import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/*
Interceptor란, AOP(관점 지향 프로그래밍)에서 영향, DI 가능
관점 지향 프로그래밍이란, 모듈성을 증가시키는 것이 목표인 프로그래밍 패러다임
각각의 핵심 기능을 횡단하면서 재사용이 가능한 기능들을 관점 지향으로 하나로 묶는다.
*/

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
