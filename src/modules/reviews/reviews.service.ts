import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewType, Filter, FindOptions } from 'src/types';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(review: CreateReviewType): Promise<Review> {
    try {
      const savedReview = await this.reviewRepository.save(review);
      const foundReview = await this.reviewRepository.findOne({
        where: { id: savedReview.id },
      });

      if (!foundReview) {
        throw new InternalServerErrorException(
          'Failed to retrieve the created review',
        );
      }

      return foundReview;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async findAll(
    take: number,
    skip: number,
    filter?: Filter,
  ): Promise<{ reviews: Review[]; totalPages: number }> {
    try {
      const where: FindOptionsWhere<FindOptions> = {};

      const { author, rating, search } = filter || {};

      if (author?.trim()) where.author = author.trim();
      if (rating) where.rating = rating;
      if (search?.trim()) where.title = Like(`%${search.trim()}%`);

      const [reviews, totalCount] = await this.reviewRepository.findAndCount({
        where,
        take,
        skip,
        order: { createdAt: 'DESC' },
      });

      const totalPages = Math.ceil(totalCount / take);

      return { reviews, totalPages };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch reviews');
    }
  }

  async findOne(id: number): Promise<Review> {
    try {
      const review = await this.reviewRepository.findOne({ where: { id } });

      if (!review) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }

      return review;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch the review');
    }
  }

  async update(id: number, review: Partial<CreateReviewType>): Promise<Review> {
    try {
      const existingReview = await this.reviewRepository.findOne({
        where: { id },
      });
      if (!existingReview) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }

      await this.reviewRepository.update(id, review);

      const updatedReview = await this.reviewRepository.findOne({
        where: { id },
      });

      if (!updatedReview) {
        throw new InternalServerErrorException(
          'Failed to retrieve the updated review',
        );
      }

      return updatedReview;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update review');
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const existingReview = await this.reviewRepository.findOne({
        where: { id },
      });
      if (!existingReview) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }

      await this.reviewRepository.delete(id);

      return { message: `Review with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete review');
    }
  }

  async findAllAuthors(): Promise<string[]> {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .select('DISTINCT review.author', 'author')
      .where('review.author IS NOT NULL')
      .orderBy('review.author', 'ASC')
      .getRawMany();

    return reviews.map((row) => row.author);
  }
}
