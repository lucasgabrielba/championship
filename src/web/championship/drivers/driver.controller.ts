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
  Driver,
  CreateDriverPropsPrimitive,
  UpdateDriverPropsPrimitive,
} from '../../../championship/domain/entities/Driver';
import { DriverService } from './Driver.service';
import { Result } from '../../../../kernel/Result/Result';

@Controller('driver')
export class DriverController {
  constructor(private readonly service: DriverService) {}

  @Get()
  async findAll(): Promise<Result<Driver[]>> {
    return await this.service.listAllDriver();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result<Driver>> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() data: CreateDriverPropsPrimitive,
  ): Promise<Result<Driver>> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDriverPropsPrimitive,
  ): Promise<Result<Driver>> {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Result<boolean>> {
    return await this.service.delete(id);
  }
}
