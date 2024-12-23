import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewType } from 'src/types';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(review: CreateReviewType): Promise<Review> {
    this.validateReview(review);

    try {
      const savedReview = await this.reviewRepository.save(review);
      return await this.reviewRepository.findOne({
        where: { id: savedReview.id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async findAll(
    take: number,
    skip: number,
    filter?: { author?: string; rating?: number },
  ): Promise<Review[]> {
    try {
      const where: Record<string, any> = {};
      if (filter?.author) where['author'] = filter.author;
      if (filter?.rating) where['rating'] = filter.rating;

      const reviews = await this.reviewRepository.find({
        where,
        take,
        skip,
        order: { createdAt: 'DESC' },
      });

      return reviews;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
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
    this.validateReviewForUpdate(review);

    try {
      const existingReview = await this.reviewRepository.findOne({
        where: { id },
      });
      if (!existingReview) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }

      await this.reviewRepository.update(id, review);
      return await this.reviewRepository.findOne({ where: { id } });
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

  private validateReview(review: Partial<CreateReviewType>) {
    const { title, content, rating, author } = review;

    if (!title || !content || !rating || !author) {
      throw new BadRequestException(
        'Fields title, content, rating, and author cannot be empty',
      );
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }
  }

  private validateReviewForUpdate(review: Partial<CreateReviewType>) {
    const { rating } = review;

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }
  }
}
