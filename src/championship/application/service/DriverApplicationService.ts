import { Result } from '../../../../kernel/Result/Result';
import { AbstractApplicationService } from '../../../../kernel/application/service/AbstactApplicationService';
import { isUUID } from '../../../../kernel/isUUID/isUUID';
import { DriverDTOPrimitive } from '../../DTO/DriverDTO';
import { DriverDomainService } from '../../domain/domainService/DriverDomainService';
import {
  Driver,
  CreateDriverPropsPrimitive,
} from '../../domain/entities/Driver';
import { DriverFilter } from '../../filters/DriverFilter';

export class DriverApplicationService extends AbstractApplicationService<
  Driver,
  DriverDTOPrimitive,
  CreateDriverPropsPrimitive,
  DriverFilter,
  DriverDomainService
> {
  constructor(readonly manager: DriverDomainService) {
    super(manager);
  }

  async getById(id: string): Promise<Result<Driver>> {
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

    return Result.ok(retrieved.data);
  }

  async get(where: object): Promise<Result<Driver>> {
    const fetched = await this.manager.getOne(where);

    if (fetched.isFailure()) {
      return Result.fail(
        new Error(`Não foi possível resgatar "${this.getModelLabel()}".`),
      );
    }

    return Result.ok<Driver>(fetched.data);
  }

  async all(options?: DriverFilter): Promise<Result<Driver[]>> {
    return this.filter(options as any);
  }

  async filter(options: DriverFilter): Promise<Result<Driver[]>> {
    const fetched = await this.manager.filter(options);

    if (fetched.isFailure()) {
      return Result.fail(
        new Error(
          `Não foi possível resgatar registros de "${this.getModelLabel()}".`,
        ),
      );
    }

    return Result.ok(fetched.data);
  }

  getModelLabel(): string {
    return Driver.LABEL;
  }

  async addChampion(id: string): Promise<Result<Driver>> {
    const driver = await this.getById(id);

    if (driver.isFailure()) {
      return Result.fail(new Error('Não foi possível regastar piloto'));
    }

    const updatedDriver = await this.update({
      ...driver.data.toDTO(),
      won: driver.data.won + 1,
    });

    if (updatedDriver.isFailure()) {
      return Result.fail(new Error('Não foi possível regastar piloto'));
    }

    return Result.ok(updatedDriver.data);
  }

  async addLoser(id: string): Promise<Result<Driver>> {
    const driver = await this.getById(id);
    if (driver.isFailure()) {
      return Result.fail(new Error('Não foi possível regastar piloto'));
    }

    const updatedDriver = await this.update({
      ...driver.data.toDTO(),
      lost: driver.data.lost + 1,
    });

    if (updatedDriver.isFailure()) {
      return Result.fail(new Error('Não foi possível regastar piloto'));
    }

    return Result.ok(updatedDriver.data);
  }
}
