import { Injectable } from '@nestjs/common';
import { ScoreApplicationService } from '../../../championship/application/service/ScoreApplicationService';
import { ScoreDomainService } from '../../../championship/domain/domainService/ScoreDomainService';
import { ScoreRepository } from '../../../infra/database/repositories/ScoreRepository';
import { ChampionshipEntrypoint } from './championship.entrypoint';
import { DriverEntrypoint } from './driver.entrypoint';

@Injectable()
export class ScoreEntrypoint {
  protected static instance: ScoreApplicationService;

  constructor(
    repository: ScoreRepository,
    protected championshipEntrypoint: ChampionshipEntrypoint,
    protected driverEntrypoint: DriverEntrypoint,
  ) {
    if (!ScoreEntrypoint.instance) {
      const championshipAppService =
        championshipEntrypoint.getApplicationService();
      const driverAppService = driverEntrypoint.getApplicationService();

      const domainService = new ScoreDomainService(repository);
      ScoreEntrypoint.instance = new ScoreApplicationService(
        domainService,
        championshipAppService,
        driverAppService,
      );
    }
  }

  getApplicationService(): ScoreApplicationService {
    return ScoreEntrypoint.instance;
  }
}
