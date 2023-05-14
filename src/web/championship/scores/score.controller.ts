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
  Score,
  CreateScorePropsPrimitive,
  UpdateScorePropsPrimitive,
} from '../../../championship/domain/entities/Score';
import { ScoreService } from './Score.service';
import { Result } from '../../../../kernel/Result/Result';

@Controller('score')
export class ScoreController {
  constructor(private readonly service: ScoreService) {}

  @Get()
  async findAll(): Promise<Result<Score[]>> {
    return await this.service.listAllScore();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Result<Score>> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() data: CreateScorePropsPrimitive,
  ): Promise<Result<Score>> {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateScorePropsPrimitive,
  ): Promise<Result<Score>> {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Result<boolean>> {
    return await this.service.remove(id);
  }
}
