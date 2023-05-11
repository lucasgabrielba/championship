import { ORMChampionship } from '../../../infra/entities/ORMChampionship';
import {
  CreateChampionshipInput,
  UpdateChampionshipInput,
} from '../../../web/DTO/Championship/championship.input';

export interface ChampionshipRepositoryInterface {
  findAll(): Promise<ORMChampionship[]>;

  findById(id: string): Promise<ORMChampionship>;

  createAndSave(data: CreateChampionshipInput): Promise<ORMChampionship>;

  updateAndSave(
    id: string,
    data: UpdateChampionshipInput,
  ): Promise<ORMChampionship>;

  delete(id: string): Promise<boolean>;
}
