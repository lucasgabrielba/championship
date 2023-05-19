import { Result } from '../../../../kernel/Result/Result';
import { AbstractDomainService } from '../../../../kernel/domain/domainService/AbstractDomainService';
import { ScoreDTO } from '../../DTO/ScoreDTO';
import { ScoreFilter } from '../../filters/ScoreFilter';
import { Score, CreateScoreProps } from '../entities/Score';
import { ScoreRepositoryInterface } from '../repository/ScoreRepositoryInterface';

export class ScoreDomainService extends AbstractDomainService<
  Score,
  ScoreDTO,
  CreateScoreProps,
  ScoreFilter,
  ScoreRepositoryInterface
> {
  constructor(protected repository: ScoreRepositoryInterface) {
    super(repository);
  }

  async create(data: CreateScoreProps): Promise<Result<Score>> {
    const created = Score.create(data);

    if (created.isFailure()) {
      return Result.fail(created.error);
    }

    return Result.ok<Score>(created.data);
  }

  async update(data: ScoreDTO): Promise<Result<Score>> {
    const built = await this.build(data);

    if (built.isFailure()) {
      return Result.fail(
        new Error(
          `Não foi possível construir ${Score.LABEL} a partir dos dados informados.`,
        ),
      );
    }

    const instance = built.data;
    const saved = await this.save(instance);

    if (saved.isFailure()) {
      return Result.fail(new Error(`Não foi possível salvar ${Score.LABEL}".`));
    }

    return Result.ok<Score>(instance);
  }

  async build(data: ScoreDTO): Promise<Result<Score>> {
    const created = Score.reconstitute(data);

    if (created.isFailure()) {
      return Result.fail(created.error);
    }

    return Result.ok<Score>(created.data);
  }
}
