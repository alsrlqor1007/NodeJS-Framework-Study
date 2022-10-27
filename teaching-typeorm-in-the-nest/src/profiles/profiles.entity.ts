import { CommonEntity } from '../common/entities/common.entity' // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, OneToOne } from 'typeorm'
import { UserEntity } from '../users/users.entity'

@Entity({
  name: 'USER_PROFILE',
})
export class ProfileEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  bio: string

  @Column({ type: 'varchar', nullable: true })
  site: string

  /*
  @OneToOne(() => UserEntity) // 양방향 연결도 가능
  user: UserEntity

  profile 모듈 서비스에서 user 엔터티에 접근할 경우 아래처럼 사용
  const profile = new ProfileEntity()
  profile.user
  */
}
