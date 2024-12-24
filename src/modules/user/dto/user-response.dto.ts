import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2024-12-24T12:34:56.789Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
