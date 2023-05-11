import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ORMRunner } from '../entities/ORMRunner';
import {
  CreateRunnerInput,
  UpdateRunnerInput,
} from '../../web/DTO/Runner/runner.input';
import { RunnerRepositoryInterface } from '../../championship/domain/repositories';

@Injectable()
export class RunnerRepository implements RunnerRepositoryInterface {
  constructor(
    @InjectRepository(ORMRunner)
    private runnerRepository: Repository<ORMRunner>,
  ) {}

  async findAll(): Promise<ORMRunner[]> {
    const result = await this.runnerRepository.find();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all runners');
    }

    return result;
  }

  async findById(id: string): Promise<ORMRunner> {
    const result = await this.runnerRepository.findOne({
      where: { id: id },
    });

    if (!result) {
      throw new InternalServerErrorException(
        `Error fetching id runner: ${id}.`,
      );
    }

    return result;
  }

  async createAndSave(data: CreateRunnerInput): Promise<ORMRunner> {
    const created = this.runnerRepository.create(data);
    const saved = await this.runnerRepository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error creating runner.');
    }

    return saved;
  }

  async updateAndSave(id: string, data: UpdateRunnerInput): Promise<ORMRunner> {
    const runner = await this.findById(id);

    if (!runner) {
      throw new InternalServerErrorException(
        'It was not possible to make the update, runner not found.',
      );
    }

    await this.runnerRepository.update(runner, { ...data });
    const created = this.runnerRepository.create({
      ...runner,
      ...data,
    });
    const saved = this.runnerRepository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error updating runner.');
    }

    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const runner = await this.findById(id);

    if (!runner) {
      throw new InternalServerErrorException(
        `Error fetching id runner: ${id}.`,
      );
    }

    const result = await this.runnerRepository.softDelete(id);

    if (result) {
      return true;
    }

    return false;
  }
}
