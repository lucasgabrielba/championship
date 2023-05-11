import {
  FilterableField,
  FilterableOffsetConnection,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { BaseDTO } from '../utils/base.dto';
import { ScoreDTO } from '../Score/score.dto';

@ObjectType('Championship')
@FilterableOffsetConnection('scores', () => ScoreDTO, { nullable: true })
export class ChampionshipDTO extends BaseDTO {
  @FilterableField()
  name: string;

  @FilterableField()
  stage: number;

  @FilterableField()
  rounds: number;
}
