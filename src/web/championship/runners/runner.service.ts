import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateRunnerInput,
  UpdateRunnerInput,
} from '../../DTO/Runner/Runner.input';
import { runnerApplicationService } from '../../../championship/aplication/service';
import { Runner } from '../../../championship/domain/entities';

@Injectable()
export class RunnerService {
  constructor(private applicationService: runnerApplicationService) {}

  async findAll(): Promise<Runner[]> {
    const result = await this.applicationService.getAll();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all Runner');
    }

    return result;
  }

  async findById(id: string): Promise<Runner> {
    const result = await this.applicationService.getOne(id);

    if (!result) {
      throw new InternalServerErrorException(
        `Error fetching id Runner: ${id}.`,
      );
    }

    return result;
  }

  async create(data: CreateRunnerInput): Promise<Runner> {
    const result = this.applicationService.create(data);

    if (!result) {
      throw new InternalServerErrorException('Error creating Runner.');
    }

    return result;
  }

  async update(id: string, data: UpdateRunnerInput): Promise<Runner> {
    const result = this.applicationService.update(id, data);

    if (!result) {
      throw new InternalServerErrorException('Error updating Runner.');
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
