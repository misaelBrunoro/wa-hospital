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
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Laboratory } from '../models/laboratory/laboratory.model';
import { LaboratoryValidator } from '../validators/laboratory/laboratory.validator';
import { LaboratoryService } from '../services/laboratory.service';

@ApiTags('Laboratory')
@Controller('laboratories')
export class LaboratoryController {
  constructor(private laboratoryService: LaboratoryService) {}

  @Get()
  @ApiOkResponse({ type: [Laboratory] })
  public async index(): Promise<Laboratory[]> {
    return this.laboratoryService.index();
  }

  @Get(':id')
  @ApiOkResponse({ type: Laboratory })
  public show(@Param('id', ParseIntPipe) id: number): Promise<Laboratory> {
    return this.laboratoryService.show(id);
  }

  @Post()
  @ApiOkResponse({ type: Laboratory })
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
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Laboratory,
  ): Promise<Laboratory> {
    return this.laboratoryService.update(id, body);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  public async destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.laboratoryService.destroy(id);
  }
}
