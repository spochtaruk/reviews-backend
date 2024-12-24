import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min, IsString, IsInt } from 'class-validator';

export class CreateReviewRequestDto {
  @ApiProperty({
    description: 'The title of the review',
    example: 'Amazing Product',
  })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the review',
    example: 'This product exceeded my expectations!',
  })
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The rating of the review, must be between 1 and 5',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  @IsInt()
  rating: number;

  @ApiProperty({
    description: 'The author of the review',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Author cannot be empty' })
  @IsString()
  author: string;
}
