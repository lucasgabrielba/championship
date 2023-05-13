import { ORMDriver } from '../../../infra/database/entities/ORMDriver';
import { CreateDriverDTO, UpdateDriverDTO } from '../../DTO/DriverDTO';

export interface DriverRrepositoryInterface {
  getById(id: string): Promise<ORMDriver>;

  getAll(): Promise<ORMDriver[]>;

  filter(): Promise<ORMDriver>;

  create(data: CreateDriverDTO): Promise<ORMDriver>;

  update(data: UpdateDriverDTO): Promise<ORMDriver>;

  delete(id: string): Promise<boolean>;
}
