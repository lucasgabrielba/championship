import { AuditableDTO } from '../../../kernel/DTO/BaseDTO';
import { ChampionshipDTO } from './ChampionshipDTO';
import { DriverDTO } from './DriverDTO';

export interface ScoreDTO extends AuditableDTO {
  id: string;
  championship: ChampionshipDTO;
  driver: DriverDTO;
  score: number;
}

export interface ScoreDTOPrimitive extends AuditableDTO {
  id: string;
  championshipId: string;
  driverId: string;
  score: number;
}
