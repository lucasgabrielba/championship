import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ScoreDTO } from '../../../entities/Score/score.dto';
import { Score } from '../../../infra/database/entities/ORMScore';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../../entities/Score/score.input';
import { ScoreResolver } from './score.resolver';
import { ScoreService } from './score.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Score])],
      resolvers: [
        {
          DTOClass: ScoreDTO,
          EntityClass: Score,
          CreateDTOClass: CreateScoreInput,
          UpdateDTOClass: UpdateScoreInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [ScoreService, ScoreResolver],
})
export class ScoreModule {}
