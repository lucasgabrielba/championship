import { Injectable } from '@nestjs/common';
import { DriverApplicationService } from '../../../championship/application/service/DriverApplicationService';
import { DriverDomainService } from '../../../championship/domain/domainService/DriverDomainService';
import { DriverRepository } from '../../../infra/database/repositories/DriverRepository';

@Injectable()
export class DriverEntrypoint {
  protected static instance: DriverApplicationService;

  constructor(repository: DriverRepository) {
    if (!DriverEntrypoint.instance) {
      const domainService = new DriverDomainService(repository);
      DriverEntrypoint.instance = new DriverApplicationService(domainService);
    }
  }

  getApplicationService(): DriverApplicationService {
    return DriverEntrypoint.instance;
  }
}
