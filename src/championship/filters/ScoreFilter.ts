import { Championship } from '../domain/entities/Championship';
import { Driver } from '../domain/entities/Driver';
import { Score } from '../domain/entities/Score';

export interface ScoreFilter {
  where?: {
    driver?: Driver;
    championship?: Championship;
    position?: number;
  };
  order?: {
    column: keyof Score;
    order: 'ASC' | 'DESC';
  };
  take?: number;
  skip?: number;
}
