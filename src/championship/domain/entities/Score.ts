import { v4 } from 'uuid';
import * as Joi from 'joi';
import { Result } from '../../../../kernel/Result/Result.js';
import {
  Auditable,
  AuditableProps,
} from '../../../../kernel/domain/entity/Auditable.js';
import { Championship } from './Championship.js';
import { Driver } from './Driver.js';
import { ScoreDTO } from '../../DTO/ScoreDTO.js';

export interface CreateScorePropsPrimitive {
  championshipId: string;
  driverId: string;
  score: number;
}

export interface UpdateScorePropsPrimitive
  extends Partial<CreateScorePropsPrimitive> {}

export interface CreateScoreProps {
  championship: Championship;
  driver: Driver;
  score: number;
}

export interface ScoreProps extends CreateScoreProps, AuditableProps {}

export class Score extends Auditable {
  constructor(protected props: ScoreProps) {
    super(props);
  }

  public static readonly LABEL: string = 'Score';

  get championship(): Championship {
    return this.props.championship;
  }

  get driver(): Driver {
    return this.props.driver;
  }

  get score(): number {
    return this.props.score;
  }

  static create(props: CreateScoreProps): Result<Score> {
    const validated = Score.validate({
      id: v4(),
      championship: props.championship,
      driver: props.driver,
      score: props.score,
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    });

    if (validated.isFailure()) {
      return Result.fail(validated.error);
    }

    return Result.ok(new Score(validated.data));
  }

  static reconstitute(props: ScoreDTO): Result<Score> {
    const validated = Score.validate({
      ...props,
      id: props.id ?? v4(),
      championship: Championship.reconstitute(props.championship).data,
      driver: Driver.reconstitute(props.driver).data,
      score: props.score,
      createdAt: props.createdAt ? new Date(props.createdAt) : undefined,
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : undefined,
      deletedAt: props.deletedAt ? new Date(props.deletedAt) : undefined,
    });

    if (validated.isFailure()) {
      return Result.fail(validated.error);
    }

    return Result.ok<Score>(new Score(validated.data));
  }

  static validate(data: ScoreProps): Result<ScoreProps> {
    const schema = {
      id: Joi.string().uuid().required(),
      championship: Joi.object().instance(Championship).required(),
      driver: Joi.object().instance(Driver).required(),
      score: Joi.number().required(),
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

  toDTO(): ScoreDTO {
    return {
      id: this.id,
      championship: this.championship.toDTO(),
      driver: this.driver.toDTO(),
      score: this.score,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.props.deletedAt
        ? this.props.deletedAt.toISOString()
        : null,
    };
  }
}
