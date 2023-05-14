import { Result } from '../../../../kernel/Result/Result';
import { AbstractApplicationService } from '../../../../kernel/application/service/AbstactApplicationService';
import { isUUID } from '../../../../kernel/isUUID/isUUID';
import { ScoreDTOPrimitive } from '../../DTO/ScoreDTO';
import { ScoreDomainService } from '../../domain/domainService/ScoreDomainService';
import { Score, CreateScorePropsPrimitive } from '../../domain/entities/Score';
import { ScoreFilter } from '../../filters/ScoreFilter';

export class ScoreApplicationService extends AbstractApplicationService<
  Score,
  ScoreDTOPrimitive,
  CreateScorePropsPrimitive,
  ScoreFilter,
  ScoreDomainService
> {
  constructor(readonly manager: ScoreDomainService) {
    super(manager);
  }

  async getById(id: string): Promise<Result<Score>> {
    const isValid = isUUID(id);

    if (!isValid) {
      return Result.fail(new Error('O id fornecido não é válido.'));
    }

    const retrieved = await this.manager.get(id);
    if (retrieved.isFailure) {
      return Result.fail(
        new Error(`Não foi possível resgatar "${this.getModelLabel()}".`),
      );
    }

    return Result.ok<Score>(retrieved.data);
  }

  async all(options?: ScoreFilter): Promise<Result<Score[]>> {
    return this.filter(options as any);
  }

  async filter(options: ScoreFilter): Promise<Result<Score[]>> {
    const fetched = await this.manager.filter(options);

    if (fetched.isFailure) {
      return Result.fail(
        new Error(
          `Não foi possível resgatar registros de "${this.getModelLabel()}".`,
        ),
      );
    }

    return Result.ok<Score[]>(fetched.data);
  }

  getModelLabel(): string {
    return Score.LABEL;
  }
}
