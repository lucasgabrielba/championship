import { ORMScore } from '../../../infra/database/entities/ORMScore';
import { CreateScoreDTO, UpdateScoreDTO } from '../../DTO/ScoreDTO';
import { NotFoundException } from '@nestjs/common';
import { ScoreCoreService } from '../../domain/CoreService/ScoreCoreService';

export class ScoreApplicationService {
  constructor(protected service: ScoreCoreService) {
    this.service = service;
  }

  async getById(id: string): Promise<ORMScore | NotFoundException> {
    const result = await this.service.getById(id);
    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async getAll(): Promise<ORMScore[]> {
    const result = await this.service.getAll();

    return result;
  }

  async filter(): Promise<ORMScore | NotFoundException> {
    const result = await this.service.filter();
    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async create(data: CreateScoreDTO): Promise<ORMScore | NotFoundException> {
    const result = await this.service.create(data);

    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async update(data: UpdateScoreDTO): Promise<ORMScore | NotFoundException> {
    const result = await this.service.update(data);

    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result;
  }
}
