import { DataSource } from 'typeorm';
import { Review } from '../modules/reviews/review.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Review],
  synchronize: true,
});

const seedData = async () => {
  await AppDataSource.initialize();

  const reviewRepository = AppDataSource.getRepository(Review);

  const reviews = [
    {
      title: 'Excellent Product',
      content: 'Exceeded my expectations!',
      rating: 5,
      author: 'John Doe',
    },
    {
      title: 'Good Value',
      content: 'Worth the price.',
      rating: 4,
      author: 'Jane Smith',
    },
    {
      title: 'Mediocre Experience',
      content: 'It was okay but not great.',
      rating: 3,
      author: 'Emily Brown',
    },
    {
      title: 'Terrible Service',
      content: 'Very disappointed.',
      rating: 1,
      author: 'Michael Johnson',
    },
    {
      title: 'Highly Recommended',
      content: 'Would buy again.',
      rating: 5,
      author: 'Alice White',
    },
    {
      title: 'Not as Expected',
      content: 'Product didn’t match the description.',
      rating: 2,
      author: 'David Green',
    },
    {
      title: 'Fantastic Quality',
      content: 'Top-notch materials.',
      rating: 5,
      author: 'Chris Black',
    },
    {
      title: 'Decent but Pricey',
      content: 'Good quality but expensive.',
      rating: 3,
      author: 'Laura Blue',
    },
    {
      title: 'Poor Durability',
      content: 'Broke after a week.',
      rating: 1,
      author: 'Sophia Gray',
    },
    {
      title: 'Very Satisfied',
      content: 'Delivered on time and works perfectly.',
      rating: 5,
      author: 'Oliver Brown',
    },
    {
      title: 'Average Purchase',
      content: 'Neither great nor bad.',
      rating: 3,
      author: 'Liam Green',
    },
    {
      title: 'Worth the Money',
      content: 'Good bang for the buck.',
      rating: 4,
      author: 'Emma Blue',
    },
    {
      title: 'Bad Packaging',
      content: 'Product arrived damaged.',
      rating: 2,
      author: 'James White',
    },
    {
      title: 'Superb Design',
      content: 'Looks amazing!',
      rating: 5,
      author: 'Ava Black',
    },
    {
      title: 'Too Expensive',
      content: 'Not worth the price.',
      rating: 2,
      author: 'Ethan Gray',
    },
    {
      title: 'Very Happy',
      content: 'Exactly what I wanted.',
      rating: 5,
      author: 'Charlotte Green',
    },
    {
      title: 'Okay Experience',
      content: 'Had some issues but resolved.',
      rating: 3,
      author: 'Amelia Blue',
    },
    {
      title: 'Terrible Quality',
      content: 'Fell apart in days.',
      rating: 1,
      author: 'Logan White',
    },
    {
      title: 'Great for Beginners',
      content: 'Easy to use and set up.',
      rating: 4,
      author: 'Lucas Brown',
    },
    {
      title: 'Exceptional Value',
      content: 'More than I expected for the price.',
      rating: 5,
      author: 'Isabella Gray',
    },
    {
      title: 'Lacking Features',
      content: 'Could use more options.',
      rating: 3,
      author: 'Mia Black',
    },
    {
      title: 'Awesome Service',
      content: 'Customer support was excellent.',
      rating: 5,
      author: 'Benjamin Green',
    },
    {
      title: 'Unreliable Product',
      content: 'Didn’t work as advertised.',
      rating: 2,
      author: 'Harper Blue',
    },
    {
      title: 'Solid Purchase',
      content: 'Good product overall.',
      rating: 4,
      author: 'Henry White',
    },
    {
      title: 'Very Durable',
      content: 'Lasted longer than expected.',
      rating: 5,
      author: 'Ella Black',
    },
    {
      title: 'Terrible Support',
      content: 'Couldn’t get help from customer service.',
      rating: 1,
      author: 'Jack Gray',
    },
    {
      title: 'Good Features',
      content: 'Has everything I need.',
      rating: 4,
      author: 'Alexander Green',
    },
    {
      title: 'Minimal Design',
      content: 'Simple and functional.',
      rating: 3,
      author: 'Emily White',
    },
    {
      title: 'Highly Functional',
      content: 'Works perfectly.',
      rating: 5,
      author: 'Charlotte Blue',
    },
    {
      title: 'Poor Instructions',
      content: 'Hard to figure out.',
      rating: 2,
      author: 'Ava Brown',
    },
  ];

  await reviewRepository.save(reviews);

  console.log('Seeded 30 reviews successfully.');

  await AppDataSource.destroy();
};

seedData().catch((error) => {
  console.error('Error seeding data:', error);
  AppDataSource.destroy();
});
