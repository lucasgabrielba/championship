import { Result } from '../../../../kernel/Result/Result';
import { AbstractDomainService } from '../../../../kernel/domain/domainService/AbstractDomainService';
import { DriverDTO } from '../../DTO/DriverDTO';
import { DriverFilter } from '../../filters/DriverFilter';
import { Driver, CreateDriverProps } from '../entities/Driver';
import { DriverRepositoryInterface } from '../repository/DriverRepositoryInterface';

export class DriverDomainService extends AbstractDomainService<
  Driver,
  DriverDTO,
  CreateDriverProps,
  DriverFilter,
  DriverRepositoryInterface
> {
  constructor(protected repository: DriverRepositoryInterface) {
    super(repository);
  }

  async getOne(where: object): Promise<Result<Driver>> {
    const fetched = await this.repository.findOneEntity(where);

    if (fetched.isFailure()) {
      return Result.fail(fetched.error);
    }

    return Result.ok<Driver>(fetched.data);
  }

  async create(data: CreateDriverProps): Promise<Result<Driver>> {
    const created = Driver.create(data);

    if (created.isFailure()) {
      return Result.fail(created.error);
    }

    return Result.ok<Driver>(created.data);
  }

  async update(data: DriverDTO): Promise<Result<Driver>> {
    const built = await this.build(data);

    if (built.isFailure()) {
      return Result.fail(
        new Error(
          `Não foi possível construir ${Driver.LABEL} a partir dos dados informados.`,
        ),
      );
    }

    const instance = built.data;
    const saved = await this.save(instance);

    if (saved.isFailure()) {
      return Result.fail(
        new Error(`Não foi possível salvar ${Driver.LABEL}".`),
      );
    }

    return Result.ok<Driver>(instance);
  }

  async build(data: DriverDTO): Promise<Result<Driver>> {
    const created = Driver.reconstitute(data);

    if (created.isFailure()) {
      return Result.fail(created.error);
    }

    return Result.ok<Driver>(created.data);
  }
}
