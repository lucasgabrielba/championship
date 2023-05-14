import { Result } from '../../Result/Result';

export interface DomainServiceInterface<
  Model,
  DTO,
  CreateProps,
  FilterOptions,
> {
  create(data: CreateProps): Promise<Result<Model>>;

  build(data: DTO): Promise<Result<Model>>;

  save(instance: Model): Promise<Result<void>>;

  createAndSave(data: CreateProps): Promise<Result<Model>>;

  get(id: string): Promise<Result<Model>>;

  getOne(options: FilterOptions): Promise<Result<Model>>;

  filter(options?: FilterOptions): Promise<Result<Model[]>>;

  remove(instance: Model): Promise<Result<void>>;
}
