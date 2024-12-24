import { DataSource } from 'typeorm';
import { Review } from '../modules/reviews/review.entity';
import { faker } from '@faker-js/faker';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Review],
  synchronize: true,
});

const createFakeReview = (): Partial<Review> => ({
  title: faker.commerce.productName(),
  content: faker.lorem.sentences(2),
  rating: faker.number.int({ min: 1, max: 5 }),
  author: faker.person.fullName(),
});

const seedData = async (count: number) => {
  await AppDataSource.initialize();

  const reviewRepository = AppDataSource.getRepository(Review);

  const reviews = Array.from({ length: count }, () => createFakeReview());

  await reviewRepository.save(reviews);

  console.log(`Seeded ${count} fake reviews successfully.`);

  await AppDataSource.destroy();
};

const count = parseInt(process.argv[2], 10) || 30;

seedData(count).catch((error) => {
  console.error('Error seeding data:', error);
  AppDataSource.destroy();
});
