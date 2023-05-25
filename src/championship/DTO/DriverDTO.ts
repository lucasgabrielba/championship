import { AuditableDTO } from '../../../kernel/DTO/BaseDTO';

export interface DriverDTO extends AuditableDTO {
  id: string;
  name: string;
  won: number;
  lost: number;
}

export interface DriverDTOPrimitive extends DriverDTO {}
