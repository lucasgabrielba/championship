import { Injectable } from '@nestjs/common';
import { ChampionshipApplicationService } from '../../../championship/application/service/ChampionshipApplicationService';
import { ChampionshipDomainService } from '../../../championship/domain/domainService/ChampionshipDomainService';
import { ChampionshipRepository } from '../../../infra/database/repositories/ChampionshipRepository';

@Injectable()
export class ChampionshipEntrypoint {
  protected static instance: ChampionshipApplicationService;

  constructor(repository: ChampionshipRepository) {
    if (!ChampionshipEntrypoint.instance) {
      const domainService = new ChampionshipDomainService(repository);
      ChampionshipEntrypoint.instance = new ChampionshipApplicationService(
        domainService,
      );
    }
  }

  getApplicationService(): ChampionshipApplicationService {
    return ChampionshipEntrypoint.instance;
  }
}
