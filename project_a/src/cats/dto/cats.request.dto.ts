import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatsRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}

// 객체지향 프로그래밍 특성 활용 - 상속

/*
export class CatsRequestDto {
  @ApiProperty({
    example: 'mingi@kakao.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'mingi',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
*/

/*
DTO(Data Transfer Object): 계층간 데이터 교환을 위한 객체
DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체
Request와 Response용 DTO는 View를 위한 클래스이다.
*/
