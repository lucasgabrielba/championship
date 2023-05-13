import { AuditableDTO } from '../../../kernel/DTO/BaseDTO';
import { ChampionshipDTO } from './ChampionshipDTO';
import { DriverDTO } from './DriverDTO';

export interface ScoreDTO extends AuditableDTO {
  id: string;
  championship: ChampionshipDTO;
  driver: DriverDTO;
  score: number;
}
