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
  CreateDriverPropsPrimitive,
  UpdateDriverPropsPrimitive,
} from '../../../championship/domain/entities/Driver';
import { DriverService } from './driver.service';
import { DriverDTO } from '../../../championship/DTO/DriverDTO';

@Controller('Driver')
export class DriverController {
  constructor(private readonly service: DriverService) {}

  @Get()
  async findAll(): Promise<DriverDTO[]> {
    const result = await this.service.listAllDriver();

    return result.data.map((driver) => driver.toDTO());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DriverDTO> {
    const result = await this.service.findOne(id);

    return result.data.toDTO();
  }

  @Post()
  async create(@Body() data: CreateDriverPropsPrimitive): Promise<DriverDTO> {
    const result = await this.service.create(data);

    return result.data.toDTO();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDriverPropsPrimitive,
  ): Promise<DriverDTO> {
    const result = await this.service.update(id, data);

    return result.data.toDTO();
  }

  @Put('/champion/:id')
  async addChampion(@Param('id') id: string): Promise<DriverDTO> {
    const result = await this.service.addChampion(id);

    return result.data.toDTO();
  }

  @Put('/loser/:id')
  async addLoser(@Param('id') id: string): Promise<DriverDTO> {
    const result = await this.service.addLoser(id);

    return result.data.toDTO();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result.data;
  }
}
