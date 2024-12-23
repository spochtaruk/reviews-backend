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
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(
    @Query('take') take: number = 10,
    @Query('skip') skip: number = 0,
    @Query('author') author?: string,
    @Query('rating') rating?: number,
  ) {
    return this.reviewsService.findAll(take, skip, { author, rating });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateReviewDto: Partial<CreateReviewDto>,
  ) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.reviewsService.delete(id);
  }
}
