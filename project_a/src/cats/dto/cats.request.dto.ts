import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatsRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

/*
DTO(Data Transfer Object): 계층간 데이터 교환을 위한 객체
DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체
Request와 Response용 DTO는 View를 위한 클래스이다.
*/
