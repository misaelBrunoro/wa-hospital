import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  Status,
  StatusArray,
  ExamType,
  ExamTypeArray,
} from '../../models/exam/exam.interface';
import { Laboratory } from '../../models/laboratory/laboratory.model';

export class ExamValidator {
  @ApiProperty({
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  public id?: number;

  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsIn(StatusArray)
  @ApiProperty({
    required: true,
    enum: [Status.active, Status.inactive],
  })
  public status: Status;

  @IsString()
  @IsIn(ExamTypeArray)
  @ApiProperty({
    required: true,
    enum: [ExamType.clinicalAnalysis, ExamType.image],
  })
  public examType: ExamType;

  @IsOptional()
  @Type(() => Laboratory)
  @ApiProperty({ required: false, isArray: true, type: Laboratory })
  public laboratories?: Laboratory[];

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false, type: 'string', format: 'date-time' })
  public createdAt?: Date;
}
