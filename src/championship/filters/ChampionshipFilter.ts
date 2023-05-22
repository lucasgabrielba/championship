import { Championship } from '../domain/entities/Championship';

export interface ChampionshipFilter {
  where?: {
    name: string;
    rounds: number;
    stage: number;
    bet: string;
  };
  order?: {
    column: keyof Championship;
    order: 'ASC' | 'DESC';
  };
  take?: number;
  skip?: number;
}
