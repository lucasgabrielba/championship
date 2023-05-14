import { Result } from '../../Result/Result';

export interface RepositoryInterface<Entity, FilterOptions> {
  persist(instance: Entity): Promise<Result<void>>;

  findById(id: string): Promise<Result<Entity | undefined>>;

  findOne(options: FilterOptions): Promise<Result<Entity | undefined>>;

  find(options?: FilterOptions): Promise<Result<Entity[]>>;

  delete(instance: Entity): Promise<Result<void>>;
}
