import { CreateScoreInput, UpdateScoreInput } from 'DTO';
import { Score } from '../entities';
import { ScoreRepositoryInterface } from '../repositories';

export class ScoreService {
  constructor(private repository: ScoreRepositoryInterface) {
    this.repository = repository;
  }

  async getAll(): Promise<Score[]> {
    const result = await this.repository.findAll();

    if (!result) {
      new Error();
    }

    let scoreArray: Score[];
    for (const score of result) {
      scoreArray.push(new Score(score));
    }

    return scoreArray;
  }

  async getById(id: string): Promise<Score> {
    const result = await this.repository.findById(id);

    if (!result) {
      new Error();
    }

    const score = new Score(result);

    return score;
  }

  async create(scoreDTO: CreateScoreInput): Promise<Score> {
    const result = await this.repository.createAndSave(scoreDTO);

    if (!result) {
      new Error();
    }

    const score = new Score(result);

    return score;
  }

  async update(id: string, scoreDTO: UpdateScoreInput): Promise<Score> {
    const result = await this.repository.updateAndSave(id, scoreDTO);

    if (!result) {
      new Error();
    }

    const score = new Score(result);

    return score;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    if (!result) {
      new Error();
    }

    return result;
  }
}
