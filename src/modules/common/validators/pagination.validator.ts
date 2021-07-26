import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export abstract class PaginationValidator {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ required: true, type: Number, minimum: 0 })
  public page: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ required: true, type: Number, minimum: 1 })
  public limit: number;

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC', null, undefined])
  @ApiProperty({ required: false, enum: ['asc', 'desc', 'ASC', 'DESC'] })
  public orderDirection: 'asc' | 'desc' | 'ASC' | 'DESC';

  public abstract orderBy: string;
}
