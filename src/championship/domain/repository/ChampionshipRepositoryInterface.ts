import { ORMChampionship } from '../../../infra/database/entities/ORMChampionship';
import {
  CreateChampionshipDTO,
  UpdateChampionshipDTO,
} from '../../DTO/ChampionshipDTO';

export interface ChampionshipRrepositoryInterface {
  getById(id: string): Promise<ORMChampionship>;

  getAll(): Promise<ORMChampionship[]>;

  filter(): Promise<ORMChampionship>;

  create(data: CreateChampionshipDTO): Promise<ORMChampionship>;

  update(data: UpdateChampionshipDTO): Promise<ORMChampionship>;

  delete(id: string): Promise<boolean>;
}
