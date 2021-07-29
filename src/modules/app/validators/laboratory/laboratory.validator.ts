import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LaboratoryValidator {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

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
