import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindReviewsRequestDto {
  @ApiProperty({
    description: 'Number of reviews to return',
    example: 10,
    required: false,
    minimum: 1,
  })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  take?: number = 10;

  @ApiProperty({
    description: 'Number of reviews to skip for pagination',
    example: 0,
    required: false,
    minimum: 0,
  })
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  skip?: number = 0;

  @ApiProperty({
    description: 'Filter reviews by author name',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    description: 'Filter reviews by rating',
    example: 5,
    required: false,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Search reviews by title or content',
    example: 'Amazing Product',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
