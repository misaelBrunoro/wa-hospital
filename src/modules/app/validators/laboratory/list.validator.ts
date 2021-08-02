import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationValidator } from '../../../common/validators/pagination.validator';
import {
  Status,
  StatusArray,
} from '../../models/laboratory/laboratory.interface';

const ordinableColumns = [
  'Laboratory.name',
  'Laboratory.status',
  'Laboratory.createdAt',
];

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, type: String })
  public name: string;

  @IsString()
  @IsIn(StatusArray)
  @IsOptional()
  @ApiProperty({ required: false, enum: [Status.active, Status.inactive] })
  public status: string;

  @IsString()
  @IsOptional()
  @IsIn(ordinableColumns)
  @ApiProperty({ required: false, enum: ordinableColumns })
  public orderBy: string;
}
