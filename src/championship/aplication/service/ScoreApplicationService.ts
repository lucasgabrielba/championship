import { CreateScoreInput, UpdateScoreInput } from 'DTO';
import { Score } from '../../domain/entities';
import { ScoreService } from '../../domain/services/scoreService';

export class ScoreApplicationService {
  constructor(private service: ScoreService) {}

  async getOne(id: string): Promise<Score> {
    const score = await this.service.getById(id);

    if (!score) {
      new Error();
    }

    return score;
  }

  async getAll(): Promise<Score[]> {
    const result = await this.service.getAll();

    if (!result) {
      new Error();
    }

    return result;
  }

  async create(scoreDTO: CreateScoreInput): Promise<Score> {
    const scoreCreated = await this.service.create(scoreDTO);

    if (!scoreCreated) {
      new Error();
    }

    return scoreCreated;
  }

  async update(id: string, scoreDTO: UpdateScoreInput): Promise<Score> {
    const scoreUpdated = await this.service.update(id, scoreDTO);

    if (!scoreUpdated) {
      new Error();
    }

    return scoreUpdated;
  }

  async delete(id: string): Promise<boolean> {
    const scoreDeleted = await this.service.delete(id);

    if (!scoreDeleted) {
      new Error();
    }

    return scoreDeleted;
  }
}
