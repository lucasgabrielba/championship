import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  CreateScorePropsPrimitive,
  UpdateScorePropsPrimitive,
} from '../../../championship/domain/entities/Score';
import { ScoreService } from './score.service';
import { ScoreDTO } from '../../../championship/DTO/ScoreDTO';

@Controller('score')
export class ScoreController {
  constructor(private readonly service: ScoreService) {}

  @Get()
  async findAll(): Promise<ScoreDTO[]> {
    const result = await this.service.listAllScore();

    return result.data.map((score) => score.toDTO());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScoreDTO> {
    const result = await this.service.findOne(id);

    return result.data.toDTO();
  }

  @Post()
  async create(@Body() data: CreateScorePropsPrimitive): Promise<ScoreDTO> {
    const result = await this.service.create(data);

    return result.data.toDTO();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateScorePropsPrimitive,
  ): Promise<ScoreDTO> {
    const result = await this.service.update(id, data);

    return result.data.toDTO();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.service.remove(id);

    return result.data;
  }
}
