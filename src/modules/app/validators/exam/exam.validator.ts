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
import {
  Status,
  StatusArray,
  ExamType,
  ExamTypeArray,
} from '../../models/exam/exam.interface';

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
  @IsDate()
  @ApiProperty({ required: false, type: 'timestamp' })
  public createdAt?: Date;
}
