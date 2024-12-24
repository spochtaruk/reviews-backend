import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  constructor(data: LoginResponseDto) {
    Object.assign(this, data);
  }

  @ApiProperty({
    description: 'The JWT access token for the authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Expose()
  accessToken: string;
}
