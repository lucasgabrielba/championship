import { Result } from '../../../../kernel/Result/Result';
import { AbstractDomainService } from '../../../../kernel/domain/domainService/AbstractDomainService';
import { ChampionshipDTO } from '../../DTO/ChampionshipDTO';
import { ChampionshipFilter } from '../../filters/ChampionshipFilter';
import {
  Championship,
  CreateChampionshipProps,
} from '../entities/Championship';
import { ChampionshipRepositoryInterface } from '../repository/ChampionshipRepositoryInterface';

export class ChampionshipDomainService extends AbstractDomainService<
  Championship,
  ChampionshipDTO,
  CreateChampionshipProps,
  ChampionshipFilter,
  ChampionshipRepositoryInterface
> {
  constructor(protected repository: ChampionshipRepositoryInterface) {
    super(repository);
  }

  async create(data: CreateChampionshipProps): Promise<Result<Championship>> {
    const created = Championship.create(data);

    if (created.isFailure) {
      return Result.fail(created.error);
    }

    return Result.ok<Championship>(created.data);
  }

  async update(data: ChampionshipDTO): Promise<Result<Championship>> {
    const built = await this.build(data);

    if (built.isFailure) {
      return Result.fail(
        new Error(
          `Não foi possível construir ${Championship.LABEL} a partir dos dados informados.`,
        ),
      );
    }

    const instance = built.data;
    const saved = await this.save(instance);

    if (saved.isFailure) {
      return Result.fail(
        new Error(`Não foi possível salvar ${Championship.LABEL}".`),
      );
    }

    return Result.ok<Championship>(instance);
  }

  async build(data: ChampionshipDTO): Promise<Result<Championship>> {
    const created = Championship.reconstitute(data);

    if (created.isFailure) {
      return Result.fail(created.error);
    }

    return Result.ok<Championship>(created.data);
  }
}
