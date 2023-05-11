import { ORMScore } from '../../../infra/entities/ORMScore';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../../web/DTO/Score/score.input';

export interface ScoreRepositoryInterface {
  findAll(): Promise<ORMScore[]>;

  findById(id: string): Promise<ORMScore>;

  createAndSave(data: CreateScoreInput): Promise<ORMScore>;

  updateAndSave(id: string, data: UpdateScoreInput): Promise<ORMScore>;

  delete(id: string): Promise<boolean>;
}
