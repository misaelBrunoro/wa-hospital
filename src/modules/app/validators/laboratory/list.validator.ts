import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationValidator } from '../../../common/validators/pagination.validator';

const ordinableColumns = [
  'Laboratory.name',
  'Laboratory.situation',
  'Laboratory.createdAt',
];

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, type: String })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, type: String })
  situation: string;

  @IsString()
  @IsOptional()
  @IsIn(ordinableColumns)
  @ApiProperty({ required: false, enum: ordinableColumns })
  orderBy: string;
}
