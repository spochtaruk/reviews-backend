import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Review } from '../review.entity';

export class FindReviewsResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The list of reviews',
    type: Review,
    isArray: true,
  })
  reviews: Review[];

  @Expose()
  @ApiProperty({
    description: 'The total number of pages available',
    example: 5,
  })
  totalPages: number;
}
