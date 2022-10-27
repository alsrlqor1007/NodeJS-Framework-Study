import { CommonEntity } from '../common/entities/common.entity' // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { VisitorEntity } from '../visitors/visitors.entity'
import { UserEntity } from 'src/users/users.entity'
import { TagEntity } from 'src/tags/tags.entity'

@Entity({
  name: 'BLOG',
})
export class BlogEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true }) // 긴 문자열은 text 타입으로 저장. 차이점은 varchar의 경우 최대 길이를 지정할 수 있다. 이외에는 같다.
  contents: string

  //* Relation */

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    onDelete: 'CASCADE', // 사용자가 삭제되면 블로그도 삭제된다.
  })
  @JoinColumn([
    // foreignkey 정보들
    {
      name: 'author_id' /* db에 저장되는 필드 이름 */,
      referencedColumnName: 'id' /* USER의 id */,
    },
  ])
  author: UserEntity

  // 하나의 블로그에 여러 태그가 달릴 수 있고, 하나의 태그가 여러 블로그에 사용될 수 있다. 다대다 관계.
  // 물리적인 DB에서는 중간 매개 테이블을 생성해서 활용한다.
  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blogs, {
    cascade: true, // 블로그를 통해 태그가 추가, 수정, 삭제되고 블로그를 저장하면 태그도 저장된다.
  })
  @JoinTable({
    // table - 매개 테이블
    name: 'BLOG_TAG',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  }) // 태그 엔터티까지에서도 생성해 줄 필요가 없다.
  tags: TagEntity[]

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog, {
    cascade: true,
  })
  visitors: VisitorEntity[]
}
