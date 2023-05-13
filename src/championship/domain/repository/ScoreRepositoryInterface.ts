import { ORMScore } from '../../../infra/database/entities/ORMScore';
import { CreateScoreDTO, UpdateScoreDTO } from '../../DTO/ScoreDTO';

export interface ScoreRrepositoryInterface {
  getById(id: string): Promise<ORMScore>;

  getAll(): Promise<ORMScore[]>;

  filter(): Promise<ORMScore>;

  create(data: CreateScoreDTO): Promise<ORMScore>;

  update(data: UpdateScoreDTO): Promise<ORMScore>;

  delete(id: string): Promise<boolean>;
}
