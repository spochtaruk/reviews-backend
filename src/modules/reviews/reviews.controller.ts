import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { CreateReviewResponseDto } from './dto/create-review-response.dto';
import { FindReviewsRequestDto } from './dto/find-reviews-request.dto';
import { FindReviewsResponseDto } from './dto/find-reviews-response.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request-dto';
import { UpdateReviewResponseDto } from './dto/update-review-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Created review',
    type: CreateReviewResponseDto,
  })
  async create(
    @Body() createReviewDto: CreateReviewRequestDto,
  ): Promise<CreateReviewResponseDto> {
    return await this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of reviews with pagination info',
    type: FindReviewsResponseDto,
  })
  async findAll(
    @Query() query: FindReviewsRequestDto,
  ): Promise<FindReviewsResponseDto> {
    const { take = 10, skip = 0, author, rating, search } = query;
    return await this.reviewsService.findAll(take, skip, {
      author,
      rating,
      search,
    });
  }

  @Get('authors')
  async getAuthors(): Promise<string[]> {
    return await this.reviewsService.findAllAuthors();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CreateReviewResponseDto> {
    return await this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updated review',
    type: UpdateReviewResponseDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewRequestDto,
  ): Promise<UpdateReviewResponseDto> {
    return await this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.reviewsService.delete(id);
  }
}
