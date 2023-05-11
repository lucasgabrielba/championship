import { ORMRunner } from '../../../infra/entities/ORMRunner';
import {
  CreateRunnerInput,
  UpdateRunnerInput,
} from '../../../web/DTO/Runner/runner.input';

export interface RunnerRepositoryInterface {
  findAll(): Promise<ORMRunner[]>;

  findById(id: string): Promise<ORMRunner>;

  createAndSave(data: CreateRunnerInput): Promise<ORMRunner>;

  updateAndSave(id: string, data: UpdateRunnerInput): Promise<ORMRunner>;

  delete(id: string): Promise<boolean>;
}
