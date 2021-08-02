import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Exam } from '../../app/models/exam/exam.model';
import { Repository } from 'typeorm';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamValidator } from '../validators/exam/exam.validator';

@ApiTags('Exam')
@Controller('exams')
export class ExamController {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  @Get()
  @ApiOkResponse({ type: [Exam] })
  public async index(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  @Get(':id')
  @ApiOkResponse({ type: Exam })
  public show(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
    return this.examRepository.findOneOrFail(id);
  }

  @Post()
  @ApiOkResponse({ type: Exam })
  public async store(@Body() body: ExamValidator): Promise<Exam> {
    const exam = this.examRepository.create(body);
    return this.examRepository.save(exam);
  }

  @Put(':id')
  @ApiOkResponse({ type: Exam })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Exam,
  ): Promise<Exam> {
    await this.examRepository.findOneOrFail(id);
    this.examRepository.update(id, body);
    return this.examRepository.findOneOrFail(id);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  public async destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.examRepository.findOneOrFail(id);
    this.examRepository.delete(id);
  }
}
