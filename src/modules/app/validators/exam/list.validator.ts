import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationValidator } from '../../../common/validators/pagination.validator';
import {
  ExamType,
  ExamTypeArray,
  Status,
  StatusArray,
} from '../../models/exam/exam.interface';

const ordinableColumns = [
  'Exam.name',
  'Exam.status',
  'Exam.type',
  'Exam.createdAt',
];

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, type: String })
  public name: string;

  @IsString()
  @IsIn(StatusArray)
  @ApiProperty({
    required: true,
    enum: [Status.active, Status.inactive],
  })
  public status: string;

  @IsString()
  @IsIn(ExamTypeArray)
  @ApiProperty({
    required: true,
    enum: [ExamType.clinicalAnalysis, ExamType.image],
  })
  public examType: string;

  @IsString()
  @IsOptional()
  @IsIn(ordinableColumns)
  @ApiProperty({ required: false, enum: ordinableColumns })
  public orderBy: string;
}
