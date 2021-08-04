import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Exam } from '../../app/models/exam/exam.model';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExamValidator } from '../validators/exam/exam.validator';
import { ExamService } from '../services/exam.service';
import { ExamNameValidator } from '../validators/exam/exam-name.validator';

@ApiTags('Exam')
@Controller('exams')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get('/byName')
  @ApiOkResponse({ type: Exam })
  @ApiOperation({
    summary: 'find one active exam by name and return laboratories.',
  })
  public findByName(@Query() query: ExamNameValidator): Promise<Exam> {
    console.log(query);
    return this.examService.findByName(query.name);
  }

  @Get(':id')
  @ApiOkResponse({ type: Exam })
  @ApiOperation({ summary: 'find one active exam.' })
  public show(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
    return this.examService.show(id);
  }

  @Get()
  @ApiOkResponse({ type: [Exam] })
  @ApiOperation({ summary: 'find all active exams.' })
  public async index(): Promise<Exam[]> {
    return this.examService.index();
  }

  @Post()
  @ApiOkResponse({ type: [Exam] })
  @ApiOperation({ summary: 'create and update one or more exams.' })
  public async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: ExamValidator[],
  ): Promise<Exam[]> {
    return this.examService.store(body);
  }

  @Delete()
  @ApiNoContentResponse()
  @ApiOperation({ summary: 'delete one or more active exams.' })
  public async destroy(@Body() body: ExamValidator[]): Promise<void> {
    return this.examService.destroy(body);
  }
}
