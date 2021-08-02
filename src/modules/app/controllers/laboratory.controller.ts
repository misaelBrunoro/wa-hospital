import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Laboratory } from '../models/laboratory/laboratory.model';
import { ListValidator } from '../validators/laboratory/list.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { LaboratoryValidator } from '../validators/laboratory/laboratory.validator';
import { ILaboratory } from '../models/laboratory/laboratory.interface';

@Controller('laboratories')
export class LaboratoryController {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<LaboratoryValidator>,
  ) {}

  /*@Get()
  public async index(
    @Query() query: ListValidator,
  ): Promise<Pagination<Laboratory>> {
    return this.laboratoryService.index(query);
  }*/

  /*@Post()
  public async store(
    @Body(new ValidationPipe()) laboratory: LaboratoryValidator,
  ): Promise<Laboratory> {
    const lab = this.laboratoryRepository.create(laboratory);
    return this.laboratoryRepository.save(lab);
  }*/

  /*@Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() laboratory: Laboratory,
  ): Promise<UpdateResult> {
    return this.laboratoryRepository.update(id, laboratory);
  }

  /*@Delete(':id')
  public async destroy(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.laboratoryService.destroy(id);
  }*/
}
