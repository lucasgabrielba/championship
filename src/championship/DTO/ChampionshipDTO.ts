import { AuditableDTO } from '../../../kernel/DTO/BaseDTO';

export interface ChampionshipDTO extends AuditableDTO {
  id: string;
  name: string;
  rounds: number;
  stage: number;
}
