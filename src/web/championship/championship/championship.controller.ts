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
  CreateChampionshipPropsPrimitive,
  UpdateChampionshipPropsPrimitive,
} from '../../../championship/domain/entities/Championship';
import { ChampionshipService } from './championship.service';
import { ChampionshipDTO } from '../../../championship/DTO/ChampionshipDTO';

@Controller('Championship')
export class ChampionshipController {
  constructor(private readonly service: ChampionshipService) {}

  @Get()
  async findAll(): Promise<ChampionshipDTO[]> {
    const result = await this.service.listAllChampionship();

    return result.data.map((Championship) => Championship.toDTO());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ChampionshipDTO> {
    const result = await this.service.findOne(id);

    return result.data.toDTO();
  }

  @Post()
  async create(
    @Body() data: CreateChampionshipPropsPrimitive,
  ): Promise<ChampionshipDTO> {
    const result = await this.service.create(data);

    return result.data.toDTO();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateChampionshipPropsPrimitive,
  ): Promise<ChampionshipDTO> {
    const result = await this.service.update(id, data);

    return result.data.toDTO();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.service.remove(id);

    return result.data;
  }
}
