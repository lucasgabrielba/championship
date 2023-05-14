import { Result } from '../../Result/Result';

export interface ApplicationServiceInterface<
  Model,
  DTO,
  CreateProps,
  FilterOptions,
> {
  /**
   * Retrieves a colection of model instances
   */
  all(): Promise<Result<Model[]>>;

  filter(options?: FilterOptions): Promise<Result<Model[]>>;

  getById(id: string): Promise<Result<Model>>;

  get(options?: FilterOptions): Promise<Result<Model>>;

  create(data: CreateProps, createdBy: string): Promise<Result<Model>>;

  update(data: DTO): Promise<Result<Model>>;
}
