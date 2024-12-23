import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Review } from 'src/modules/reviews/review.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Review],
  synchronize: true,
};
