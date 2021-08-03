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
  @ApiOkResponse({ type: Laboratory })
  @ApiOperation({
    summary: 'create an laboratory with or without linked exams.',
  })
  public async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: LaboratoryValidator,
  ): Promise<Laboratory> {
    return this.laboratoryService.store(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: Laboratory })
  @ApiOperation({
    summary: 'update an laboratory, links and unlinks exams.',
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Laboratory,
  ): Promise<Laboratory> {
    return this.laboratoryService.store(body, id);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiOperation({
    summary: 'delete an active laboratory.',
  })
  public async destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.laboratoryService.destroy(id);
  }
}
