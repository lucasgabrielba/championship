import { RunnerDTO } from 'DTO';
import { Runner } from '../../../../championship/domain/entities';

export function runnerToDTO(runner: Runner): RunnerDTO {
  const runnerDTO: RunnerDTO = {
    id: runner.id,
    name: runner.name,
    createdAt: runner.createAt,
    updatedAt: runner.updatedAt,
    deletedAt: runner.deletedAt,
  };

  return runnerDTO;
}
