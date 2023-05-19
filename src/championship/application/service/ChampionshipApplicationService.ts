import { Result } from '../../../../kernel/Result/Result';
import { AbstractApplicationService } from '../../../../kernel/application/service/AbstactApplicationService';
import { isUUID } from '../../../../kernel/isUUID/isUUID';
import { ChampionshipDTOPrimitive } from '../../DTO/ChampionshipDTO';
import { ChampionshipDomainService } from '../../domain/domainService/ChampionshipDomainService';
import {
  Championship,
  CreateChampionshipPropsPrimitive,
} from '../../domain/entities/Championship';
import { ChampionshipFilter } from '../../filters/ChampionshipFilter';

export class ChampionshipApplicationService extends AbstractApplicationService<
  Championship,
  ChampionshipDTOPrimitive,
  CreateChampionshipPropsPrimitive,
  ChampionshipFilter,
  ChampionshipDomainService
> {
  constructor(readonly manager: ChampionshipDomainService) {
    super(manager);
  }

  async getById(id: string): Promise<Result<Championship>> {
    const isValid = isUUID(id);

    if (!isValid) {
      return Result.fail(new Error('O id fornecido não é válido.'));
    }

    const retrieved = await this.manager.get(id);
    if (retrieved.isFailure()) {
      return Result.fail(
        new Error(`Não foi possível resgatar "${this.getModelLabel()}".`),
      );
    }

    return Result.ok<Championship>(retrieved.data);
  }

  async all(options?: ChampionshipFilter): Promise<Result<Championship[]>> {
    return this.filter(options as any);
  }

  async filter(options: ChampionshipFilter): Promise<Result<Championship[]>> {
    const fetched = await this.manager.filter(options);

    if (fetched.isFailure()) {
      return Result.fail(
        new Error(
          `Não foi possível resgatar registros de "${this.getModelLabel()}".`,
        ),
      );
    }

    return Result.ok<Championship[]>(fetched.data);
  }

  getModelLabel(): string {
    return Championship.LABEL;
  }
}
