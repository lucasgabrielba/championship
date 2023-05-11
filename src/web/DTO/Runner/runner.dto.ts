import {
  FilterableField,
  FilterableOffsetConnection,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { BaseDTO } from '../utils/base.dto';
import { ScoreDTO } from '../Score/score.dto';

@ObjectType('Runner')
@FilterableOffsetConnection('scores', () => ScoreDTO, { nullable: true })
export class RunnerDTO extends BaseDTO {
  @FilterableField()
  name: string;
}
