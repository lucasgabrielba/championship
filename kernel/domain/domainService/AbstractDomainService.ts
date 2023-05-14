import { Result } from '../../Result/Result';
import { DomainServiceInterface } from './DomainServiceInterface';

export abstract class AbstractDomainService<
  Model,
  DTO,
  CreateProps,
  FilterOptions,
  Repository,
> implements DomainServiceInterface<Model, DTO, CreateProps, FilterOptions>
{
  constructor(protected repository: Repository) {}

  async filter(options?: FilterOptions): Promise<Result<Model[]>> {
    const fetched = await (this.repository as any).find(options);

    if (fetched.isFailure) {
      return Result.fail(fetched.error);
    }

    return Result.ok<Model[]>(fetched.getValue());
  }

  async get(id: string): Promise<Result<Model>> {
    const fetched = await (this.repository as any).findById(id);

    if (fetched.isFailure) {
      return Result.fail(fetched.error);
    }

    return Result.ok<Model>(fetched.getValue());
  }

  async getOne(options: FilterOptions): Promise<Result<Model>> {
    const fetched = await (this.repository as any).findOne(options);

    if (fetched.isFailure) {
      return Result.fail(fetched.error);
    }

    return Result.ok<Model>(fetched.getValue());
  }

  abstract create(data: CreateProps): Promise<Result<Model>>;

  abstract build(data: DTO): Promise<Result<Model>>;

  async save(instance: Model): Promise<Result<void>> {
    const saved = await (this.repository as any).persist(instance);

    if (saved.isFailure) {
      return Result.fail(saved.error);
    }

    return Result.ok<void>();
  }

  async createAndSave(data: CreateProps): Promise<Result<Model>> {
    const created = await this.create(data);

    if (created.isFailure) {
      return Result.fail(created.error);
    }

    const instance = created.data;
    const saved = await this.save(instance);
    // const saved = await (this.repository as any).persist(instance);
    if (saved.isFailure) {
      return Result.fail(saved.error);
    }

    return Result.ok<Model>(instance);
  }

  async remove(instance: Model): Promise<Result<void>> {
    const deleted = await (this.repository as any).delete(instance);

    if (deleted.isFailure) {
      return Result.fail(deleted.error);
    }

    return Result.ok<void>();
  }
}
