import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  Status,
  StatusArray,
  ExamType,
  ExamTypeArray,
} from '../../models/exam/exam.interface';

export class ExamValidator {
  @ApiProperty({
    type: String,
  })
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
}
