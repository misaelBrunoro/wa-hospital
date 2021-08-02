import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Status, StatusArray } from '../../models/exam/exam.interface';
import { Exam } from '../../models/exam/exam.model';
import { Type } from 'class-transformer';

export class LaboratoryValidator {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(StatusArray, { each: true })
  @ApiProperty({ required: true, enum: StatusArray, isArray: true })
  public status: Status;

  @IsNotEmpty()
  @Type(() => Exam)
  @ApiProperty({ required: false, isArray: true })
  public exams?: Exam[];

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false, type: 'timestamp' })
  public createdAt?: Date;
}
