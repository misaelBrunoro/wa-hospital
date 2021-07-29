import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExamValidator {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /*@ApiProperty({
    type: Situation,
  })
  @IsEnum(Situation, { each: true })
  situation: Situation;

  @ApiProperty({
    type: Discipline,
  })
  disciplines: Discipline[];*/
}
