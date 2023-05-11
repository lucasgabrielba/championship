import {
  FilterableField,
  FilterableRelation,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { BaseDTO } from '../utils/base.dto';
import { ChampionshipDTO } from '../Championship/championship.dto';
import { RunnerDTO } from '../Runner/runner.dto';

@ObjectType('Score')
@FilterableRelation('championship', () => ChampionshipDTO)
@FilterableRelation('runner', () => RunnerDTO)
export class ScoreDTO extends BaseDTO {
  @FilterableField()
  points: number;
}
