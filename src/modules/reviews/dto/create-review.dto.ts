import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;

  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number;

  @IsNotEmpty({ message: 'Author cannot be empty' })
  author: string;
}
