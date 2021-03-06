import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Laboratory } from '../models/laboratory/laboratory.model';
import { LaboratoryValidator } from '../validators/laboratory/laboratory.validator';
import { LaboratoryService } from '../services/laboratory.service';

@ApiTags('Laboratory')
@Controller('laboratories')
export class LaboratoryController {
  constructor(private laboratoryService: LaboratoryService) {}

  @Get()
  @ApiOkResponse({ type: [Laboratory] })
  @ApiOperation({ summary: 'find all active laboratories.' })
  public async index(): Promise<Laboratory[]> {
    return this.laboratoryService.index();
  }

  @Get(':id')
  @ApiOkResponse({ type: Laboratory })
  @ApiOperation({ summary: 'find one active laboratory.' })
  public show(@Param('id', ParseIntPipe) id: number): Promise<Laboratory> {
    return this.laboratoryService.show(id);
  }

  @Post()
  @ApiOkResponse({ type: [Laboratory] })
  @ApiOperation({
    summary:
      'create and update one or more laboratories with or without linked exams.' +
      'Link and unlink exams to laboratories.',
  })
  public async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: LaboratoryValidator[],
  ): Promise<Laboratory[]> {
    return this.laboratoryService.store(body);
  }

  @Delete()
  @ApiNoContentResponse()
  @ApiOperation({
    summary: 'delete one or more active laboratories.',
  })
  public async destroy(@Body() body: LaboratoryValidator[]): Promise<void> {
    return this.laboratoryService.destroy(body);
  }
}
