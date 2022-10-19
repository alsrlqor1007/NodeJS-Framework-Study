import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from '../comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // 스키마 데코레이터로 생성
export class Cat extends Document {
  // mongoose의 Document를 확장해서 Cat 생성

  @ApiProperty({
    example: 'mingi@kakao.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'mingi',
    description: 'name',
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'password',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ default: '디폴트 이미지 경로' })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat); // 정의한 Cat 클래스를 스키마로

// 클라이언트에게 보여줄 데이터만 virtual로 필터링
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

// comments 데이터를 담기 위한 것
_CatSchema.virtual('commentsList', {
  ref: 'comments', // 해당하는 스키마
  localField: '_id',
  foreignField: 'info',
});

// populate: 다른 document와 이어줄 수 있는 메서드
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
