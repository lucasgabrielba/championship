import { ORMScore } from '../../../infra/database/entities/ORMScore';
import { CreateScoreDTO, UpdateScoreDTO } from '../../DTO/ScoreDTO';
import { ScoreRrepositoryInterface } from '../repository/ScoreRepositoryInterface';
import { NotFoundException } from '@nestjs/common';

export class ScoreCoreService {
  constructor(protected repository: ScoreRrepositoryInterface) {
    this.repository = repository;
  }

  async getById(id: string): Promise<ORMScore | NotFoundException> {
    const result = await this.repository.getById(id);
    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async getAll(): Promise<ORMScore[]> {
    const result = await this.repository.getAll();

    return result;
  }

  async filter(): Promise<ORMScore | NotFoundException> {
    const result = await this.repository.filter();
    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async create(data: CreateScoreDTO): Promise<ORMScore | NotFoundException> {
    const result = await this.repository.create(data);

    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async update(data: UpdateScoreDTO): Promise<ORMScore | NotFoundException> {
    const result = await this.repository.update(data);

    if (!result) {
      return new NotFoundException('Score not found');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    return result;
  }
}
