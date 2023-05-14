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
  Championship,
  CreateChampionshipPropsPrimitive,
  UpdateChampionshipPropsPrimitive,
} from '../../../championship/domain/entities/Championship';
import { ChampionshipService } from './championship.service';
import { Result } from '../../../../kernel/Result/Result';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly service: ChampionshipService) {}

  @Get()
  async findAll(): Promise<Result<Championship[]>> {
    return await this.service.listAllChampionship();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result<Championship>> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() data: CreateChampionshipPropsPrimitive,
  ): Promise<Result<Championship>> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateChampionshipPropsPrimitive,
  ): Promise<Result<Championship>> {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Result<boolean>> {
    return await this.service.remove(id);
  }
}
