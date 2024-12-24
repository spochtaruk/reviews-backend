import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Unique identifier of the review',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'The title of the review',
    example: 'Amazing Product',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The content of the review',
    example: 'Exceeded my expectations!',
  })
  content: string;

  @Expose()
  @ApiProperty({
    description: 'The rating of the review',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @Expose()
  @ApiProperty({
    description: 'The author of the review',
    example: 'John Doe',
  })
  author: string;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the review was created',
    example: '2024-12-24T12:34:56.789Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
