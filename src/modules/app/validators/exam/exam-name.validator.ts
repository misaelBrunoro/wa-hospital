import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExamNameValidator {
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
