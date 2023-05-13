import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Championship } from '../../../championship/domain/entities/Championship';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly service: ChampionshipService) {}

  @Get()
  async findAll(): Promise<Championship[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Championship> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() championshipData: Championship): Promise<Championship> {
    return this.service.create(championshipData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() championshipData: Championship,
  ): Promise<void> {
    await this.service.update(id, championshipData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.championshipService.delete(id);
  }
}
