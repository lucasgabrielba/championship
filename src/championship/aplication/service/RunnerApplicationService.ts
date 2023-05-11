import { CreateRunnerInput, UpdateRunnerInput } from '../../../web/DTO';
import { Runner } from '../../domain/entities';
import { RunnerService } from '../../domain/services/runnerService';

export class runnerApplicationService {
  constructor(private service: RunnerService) {}

  async getOne(id: string): Promise<Runner> {
    const runner = await this.service.getById(id);

    if (!runner) {
      new Error();
    }

    return runner;
  }

  async getAll(): Promise<Runner[]> {
    const result = await this.service.getAll();

    if (!result) {
      new Error();
    }

    return result;
  }

  async create(runnerDTO: CreateRunnerInput): Promise<Runner> {
    const runnerCreated = await this.service.create(runnerDTO);

    if (!runnerCreated) {
      new Error();
    }

    return runnerCreated;
  }

  async update(id: string, runnerDTO: UpdateRunnerInput): Promise<Runner> {
    const runnerUpdated = await this.service.update(id, runnerDTO);

    if (!runnerUpdated) {
      new Error();
    }

    return runnerUpdated;
  }

  async delete(id: string): Promise<boolean> {
    const runnerDeleted = await this.service.delete(id);

    if (!runnerDeleted) {
      new Error();
    }

    return runnerDeleted;
  }
}
