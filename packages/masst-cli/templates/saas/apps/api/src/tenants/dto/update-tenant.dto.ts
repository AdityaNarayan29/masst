import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateTenantDto {
  @ApiProperty({ example: 'My Organization', required: false })
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;
}
