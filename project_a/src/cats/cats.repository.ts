import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatsRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';
import { CommentsSchema } from '../comments/comments.schema';

/*
서비스와 db 사이에 중개자
데이터베이스와 직접적으로 연결하는 로직들은 repository를 사용 - repository pattern
다른 모듈의 서비스에서 접근할 때 해당 레포지토리 접근하면 된다.
각 모듈에서는 각각의 비즈니스 로직에만 더 집중하고 모듈 간의 책임분리도 확실해진다.
서비스의 레이어에서 서비스의 출처와 관계없이 동일한 방식으로 데이터에 접근할 수 있다.
*/

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<any> {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatsRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password'); // password는 제외하고 가져올 때. 가져오고 싶은 소스는 - 없이 표시.
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id); // 현재 로그인 정보
    cat.imgUrl = `http://localhost:8000/media/${fileName}`; // 이미지 url 변경
    const newCat = await cat.save(); // 업데이트 된 내용 저장
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findAll() {
    // return this.catModel.find();
    const CommentsModel = mongoose.model('comments', CommentsSchema);

    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel); // virual field를 path에 작성

    return result;
  }
}
