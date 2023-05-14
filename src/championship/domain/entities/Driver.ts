import { uuid } from 'uuidv4';
import { Result } from '../../../../kernel/Result/Result.js';
import { DriverDTO } from '../../DTO/DriverDTO.js';
import Joi from 'joi';
import {
  Auditable,
  AuditableProps,
} from '../../../../kernel/domain/entity/Auditable.js';

export interface CreateDriverPropsPrimitive {
  name: string;
}

export interface UpdateDriverPropsPrimitive
  extends Partial<CreateDriverPropsPrimitive> {}

export interface CreateDriverProps extends CreateDriverPropsPrimitive {}

export interface DriverProps extends CreateDriverProps, AuditableProps {}

export class Driver extends Auditable {
  constructor(protected props: DriverProps) {
    super(props);
  }

  public static readonly LABEL: string = 'Driver';

  get name(): string {
    return this.props.name;
  }

  static create(props: CreateDriverProps): Result<Driver> {
    const validated = Driver.validate({
      id: uuid(),
      name: props.name,
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    });

    if (validated.isFailure) {
      return Result.fail(validated.error);
    }

    return Result.ok(new Driver(validated.data));
  }

  static reconstitute(props: DriverDTO): Result<Driver> {
    const validated = Driver.validate({
      ...props,
      id: uuid(),
      createdAt: props.createdAt ? new Date(props.createdAt) : undefined,
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : undefined,
      deletedAt: props.deletedAt ? new Date(props.deletedAt) : undefined,
    });

    if (validated.isFailure) {
      return Result.fail(validated.error);
    }

    return Result.ok<Driver>(new Driver(validated.data));
  }

  static validate(data: DriverProps): Result<DriverProps> {
    const schema = {
      id: Joi.string().uuid().required(),
      name: Joi.string().min(1).max(255).required(),
      createdAt: Joi.object().instance(Date).required(),
      updatedAt: Joi.object().instance(Date).optional(),
      deletedAt: Joi.object().instance(Date).optional(),
    };

    const { value, error } = Joi.object(schema).unknown().validate(data);

    if (error) {
      return Result.fail(error);
    }

    return Result.ok(value);
  }

  toDTO(): DriverDTO {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.props.deletedAt
        ? this.props.deletedAt.toISOString()
        : null,
    };
  }
}
