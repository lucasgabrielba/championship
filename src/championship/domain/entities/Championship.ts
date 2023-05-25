import { v4 } from 'uuid';
import * as Joi from 'joi';
import { Result } from '../../../../kernel/Result/Result.js';
import { ChampionshipDTO } from '../../DTO/ChampionshipDTO.js';
import {
  Auditable,
  AuditableProps,
} from '../../../../kernel/domain/entity/Auditable.js';

export interface CreateChampionshipPropsPrimitive {
  name: string;
  rounds: number;
  stage: number;
  bet?: string;
}

export interface UpdateChampionshipPropsPrimitive
  extends Partial<CreateChampionshipPropsPrimitive> {}

export interface CreateChampionshipProps
  extends CreateChampionshipPropsPrimitive {}

export interface ChampionshipProps
  extends CreateChampionshipProps,
  AuditableProps {}

export class Championship extends Auditable {
  constructor(protected props: ChampionshipProps) {
    super(props);
  }

  public static readonly LABEL: string = 'Championship';

  get name(): string {
    return this.props.name;
  }

  get rounds(): number {
    return this.props.rounds;
  }

  get stage(): number {
    return this.props.stage;
  }

  get bet(): string {
    return this.props.bet;
  }

  static create(props: CreateChampionshipProps): Result<Championship> {
    const validated = Championship.validate({
      id: v4(),
      name: props.name,
      rounds: props.rounds,
      bet: props.bet ?? undefined,
      stage: 0,
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    });

    if (validated.isFailure()) {
      return Result.fail(validated.error);
    }

    return Result.ok(new Championship(validated.data));
  }

  static reconstitute(props: ChampionshipDTO): Result<Championship> {
    const validated = Championship.validate({
      ...props,
      id: props.id ?? v4(),
      createdAt: props.createdAt ? new Date(props.createdAt) : undefined,
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : undefined,
      deletedAt: props.deletedAt ? new Date(props.deletedAt) : undefined,
    });

    if (validated.isFailure()) {
      return Result.fail(validated.error);
    }

    return Result.ok<Championship>(new Championship(validated.data));
  }

  static validate(data: ChampionshipProps): Result<ChampionshipProps> {
    const schema = {
      id: Joi.string().uuid().required(),
      name: Joi.string().min(1).max(255).required(),
      rounds: Joi.number().min(1).max(10).required(),
      stage: Joi.number().max(10).required(),
      bet: Joi.string().allow('').optional(),
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

  toDTO(): ChampionshipDTO {
    return {
      id: this.id,
      name: this.name,
      rounds: this.rounds,
      stage: this.stage,
      bet: this.bet,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.props.deletedAt
        ? this.props.deletedAt.toISOString()
        : null,
    };
  }
}
