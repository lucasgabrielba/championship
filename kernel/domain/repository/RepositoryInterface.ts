import { Result } from '../../Result/Result';

export interface RepositoryInterface<Entity, FilterOptions> {
  persist(instance: Entity): Promise<Result<void>>;

  findById(id: string): Promise<Result<Entity | undefined>>;

  findOneEntity(options: FilterOptions): Promise<Result<Entity | undefined>>;

  findEntity(options?: FilterOptions): Promise<Result<Entity[]>>;

  deleteEntity(instance: Entity): Promise<Result<void>>;
}
