import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Review } from 'src/modules/reviews/review.entity';
import { User } from 'src/modules/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Review, User],
  synchronize: true,
};
