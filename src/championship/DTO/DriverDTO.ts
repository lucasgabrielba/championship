import { AuditableDTO } from '../../../kernel/DTO/BaseDTO';

export interface DriverDTO extends AuditableDTO {
  id: string;
  name: string;
}

export interface DriverDTOPrimitive extends DriverDTO {}
