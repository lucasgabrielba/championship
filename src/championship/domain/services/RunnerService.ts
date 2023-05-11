import { CreateRunnerInput, UpdateRunnerInput } from '../../../web/DTO';
import { Runner } from '../entities';
import { RunnerRepositoryInterface } from '../repositories';

export class RunnerService {
  constructor(private repository: RunnerRepositoryInterface) {
    this.repository = repository;
  }

  async getAll(): Promise<Runner[]> {
    const result = await this.repository.findAll();

    if (!result) {
      new Error();
    }

    let runners;
    for (const runner of result) {
      runners.push(new Runner(runner));
    }

    return runners;
  }

  async getById(id: string): Promise<Runner> {
    const result = await this.repository.findById(id);

    if (!result) {
      new Error();
    }

    const runner = new Runner(result);

    return runner;
  }

  async create(runnerDTO: CreateRunnerInput): Promise<Runner> {
    const result = await this.repository.createAndSave(runnerDTO);

    if (!result) {
      new Error();
    }

    const runner = new Runner(result);

    return runner;
  }

  async update(id: string, runnerDTO: UpdateRunnerInput): Promise<Runner> {
    const result = await this.repository.updateAndSave(id, runnerDTO);

    if (!result) {
      new Error();
    }

    const runner = new Runner(result);

    return runner;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    if (!result) {
      new Error();
    }

    return result;
  }
}
