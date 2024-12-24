import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findAllAuthors: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    reviewsController = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(reviewsController).toBeDefined();
  });

  describe('create', () => {
    it('should call ReviewsService.create with the correct data', async () => {
      const dto: CreateReviewRequestDto = {
        title: 'Test Review',
        content: 'This is a test review.',
        rating: 5,
        author: 'John Doe',
      };
      const mockReview = { id: 1, ...dto, createdAt: new Date() };

      jest.spyOn(reviewsService, 'create').mockResolvedValue(mockReview);

      const result = await reviewsController.create(dto);

      expect(reviewsService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockReview);
    });
  });

  describe('findAll', () => {
    it('should call ReviewsService.findAll with the correct query params', async () => {
      const mockReviews = {
        reviews: [
          {
            id: 1,
            title: 'Test Review',
            content: 'This is a test review.',
            rating: 5,
            author: 'John Doe',
            createdAt: new Date(),
          },
        ],
        totalPages: 1,
      };

      jest.spyOn(reviewsService, 'findAll').mockResolvedValue(mockReviews);

      const take = 10;
      const skip = 0;
      const result = await reviewsController.findAll({ take, skip });

      expect(reviewsService.findAll).toHaveBeenCalledWith(take, skip, {
        author: undefined,
        rating: undefined,
        search: undefined,
      });
      expect(result).toEqual(mockReviews);
    });
  });

  describe('findOne', () => {
    it('should call ReviewsService.findOne with the correct ID', async () => {
      const mockReview = {
        id: 1,
        title: 'Test Review',
        content: 'This is a test review.',
        rating: 5,
        author: 'John Doe',
        createdAt: new Date(),
      };

      jest.spyOn(reviewsService, 'findOne').mockResolvedValue(mockReview);

      const id = 1;
      const result = await reviewsController.findOne(id);

      expect(reviewsService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockReview);
    });
  });

  describe('getAuthors', () => {
    it('should return a list of authors', async () => {
      const mockAuthors = ['John Doe', 'Jane Doe'];

      jest
        .spyOn(reviewsService, 'findAllAuthors')
        .mockResolvedValue(mockAuthors);

      const result = await reviewsController.getAuthors();

      expect(reviewsService.findAllAuthors).toHaveBeenCalled();
      expect(result).toEqual(mockAuthors);
    });
  });

  describe('delete', () => {
    it('should call ReviewsService.delete with the correct ID', async () => {
      const id = 1;

      jest.spyOn(reviewsService, 'delete').mockResolvedValue({
        message: `Review with ID ${id} deleted successfully`,
      });

      const result = await reviewsController.delete(id);

      expect(reviewsService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        message: `Review with ID ${id} deleted successfully`,
      });
    });
  });
});
