import * as requestIp from 'request-ip'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()

    if (request.headers['cf-connecting-ip'])
      //* cloudflare origin ip */
      return request.headers['cf-connecting-ip']
    else return requestIp.getClientIp(request)
  },
)

/*
현재 사용자의 IP를 추출하는 데코레이터

컨트롤러에서,
@ClientIp() ip: string로 사용

방문객 집계, 조회수 등에 활용 가능
 */
