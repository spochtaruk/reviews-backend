import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  id: number;
}
