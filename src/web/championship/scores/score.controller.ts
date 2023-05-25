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
import { DriverDTO } from '../../../championship/DTO/DriverDTO';

@Controller('score')
export class ScoreController {
  constructor(private readonly service: ScoreService) {}

  @Get()
  async findAll(): Promise<ScoreDTO[]> {
    const result = await this.service.listAllScore();

    return result.data.map((score) => score.toDTO());
  }

  @Get('/statistics')
  async getStatistics(): Promise<object[]> {
    const result = await this.service.getStatistics();

    return result.data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScoreDTO> {
    const result = await this.service.findOne(id);

    return result.data.toDTO();
  }

  @Get('table/:id')
  async findTable(@Param('id') id: string): Promise<ScoreDTO[]> {
    const result = await this.service.findTable(id);

    return result.data.map((score) => score.toDTO());
  }

  @Post()
  async create(@Body() data: CreateScorePropsPrimitive): Promise<ScoreDTO> {
    const result = await this.service.create(data);

    return result.data.toDTO();
  }

  @Post('/many')
  async createMany(@Body() data: string[]): Promise<ScoreDTO[]> {
    const result = await this.service.createMany(data);

    return result.data.map((score) => score.toDTO());
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateScorePropsPrimitive,
  ): Promise<ScoreDTO> {
    const result = await this.service.update(id, data);

    return result.data.toDTO();
  }

  @Put('/addScore/:id')
  async addScore(
    @Param('id') id: string,
    @Body() data: DriverDTO[],
  ): Promise<boolean> {
    const result = await this.service.addScore(id, data);

    return result.data;
  }

  @Post('/resetScores')
  async resetScores(@Body() data: ScoreDTO[]): Promise<boolean> {
    const result = await this.service.resetScores(data);

    return result.data;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.service.remove(id);

    return result.data;
  }
}
