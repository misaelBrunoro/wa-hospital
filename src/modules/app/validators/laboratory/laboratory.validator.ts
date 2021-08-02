import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
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
  @ApiProperty({ required: false, type: 'integer' })
  @IsOptional()
  @IsInt()
  @Min(0)
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

  @IsString()
  @IsIn(StatusArray)
  @ApiProperty({
    required: true,
    enum: [Status.active, Status.inactive],
  })
  public status: Status;

  @IsOptional()
  @Type(() => Exam)
  @ApiProperty({ required: false, isArray: true })
  public exams?: Exam[];

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false, type: 'timestamp' })
  public createdAt?: Date;
}
