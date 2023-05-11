import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../DTO/Score/Score.input';
import { Score } from '../../../championship/domain/entities';
import { ScoreApplicationService } from '../../../championship/aplication/service/ScoreApplicationService';

@Injectable()
export class ScoreService {
  constructor(private applicationService: ScoreApplicationService) {}

  async findAll(): Promise<Score[]> {
    const result = await this.applicationService.getAll();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all Score');
    }

    return result;
  }

  async findById(id: string): Promise<Score> {
    const result = await this.applicationService.getOne(id);

    if (!result) {
      throw new InternalServerErrorException(`Error fetching id Score: ${id}.`);
    }

    return result;
  }

  async create(data: CreateScoreInput): Promise<Score> {
    const result = this.applicationService.create(data);

    if (!result) {
      throw new InternalServerErrorException('Error creating Score.');
    }

    return result;
  }

  async update(id: string, data: UpdateScoreInput): Promise<Score> {
    const result = this.applicationService.update(id, data);

    if (!result) {
      throw new InternalServerErrorException('Error updating Score.');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.applicationService.delete(id);

    if (result) {
      return true;
    }

    return false;
  }
}
