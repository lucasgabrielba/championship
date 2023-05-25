import { Driver } from '../domain/entities/Driver';

export interface DriverFilter {
  where?: {
    name: string;
    won: number;
    lost: number;
  };
  order?: {
    column: keyof Driver;
    order: 'ASC' | 'DESC';
  };
  take?: number;
  skip?: number;
}
