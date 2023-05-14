import { Injectable } from '@nestjs/common';
import { ScoreApplicationService } from '../../../championship/application/service/ScoreApplicationService';
import { ScoreDomainService } from '../../../championship/domain/domainService/ScoreDomainService';
import { ScoreRepository } from '../../../infra/database/repositories/ScoreRepository';

@Injectable()
export class ScoreEntrypoint {
  protected static instance: ScoreApplicationService;

  constructor(repository: ScoreRepository) {
    if (!ScoreEntrypoint.instance) {
      const domainService = new ScoreDomainService(repository);
      ScoreEntrypoint.instance = new ScoreApplicationService(domainService);
    }
  }

  getApplicationService(): ScoreApplicationService {
    return ScoreEntrypoint.instance;
  }
}
