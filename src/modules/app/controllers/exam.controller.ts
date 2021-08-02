import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Exam } from '../../app/models/exam/exam.model';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExamValidator } from '../validators/exam/exam.validator';
import { ExamService } from '../services/exam.service';

@ApiTags('Exam')
@Controller('exams')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get()
  @ApiOkResponse({ type: [Exam] })
  public async index(): Promise<Exam[]> {
    return this.examService.index();
  }

  @Get(':id')
  @ApiOkResponse({ type: Exam })
  public show(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
    return this.examService.show(id);
  }

  @Post()
  @ApiOkResponse({ type: Exam })
  public async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: ExamValidator,
  ): Promise<Exam> {
    return this.examService.store(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: Exam })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Exam,
  ): Promise<Exam> {
    return this.examService.update(id, body);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  public async destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.destroy(id);
  }
}
