import { ChampionshipDTO } from '../DTO/ChampionshipDTO';
import { DriverDTO } from '../DTO/DriverDTO';
import { Score } from '../domain/entities/Score';

export interface ScoreFilter {
  where?: {
    id: string;
    driver?: DriverDTO;
    championship?: ChampionshipDTO;
    position?: number;
  };
  order?: {
    column: keyof Score;
    order: 'ASC' | 'DESC';
  };
  take?: number;
  skip?: number;
}
