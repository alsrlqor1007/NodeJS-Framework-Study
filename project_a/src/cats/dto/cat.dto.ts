import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '351651321',
    description: 'id',
  })
  id: string;
}

// OmitType은 반대로 필요 없는 것 명시

/*
export class ReadOnlyCatDto {
  @ApiProperty({
    example: '351651321',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'mingi@kakao.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'mingi',
    description: 'name',
  })
  name: string;
}
*/
