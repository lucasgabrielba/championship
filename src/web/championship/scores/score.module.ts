import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ScoreDTO } from '../../DTO/Score/score.dto';
import { ORMScore } from '../../../infra/entities/ORMScore';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../DTO/Score/score.input';
import { ScoreResolver } from './score.resolver';
import { ScoreService } from './score.service';
import { ScoreApplicationService } from '../../../championship/aplication/service/ScoreApplicationService';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ORMScore])],
      resolvers: [
        {
          DTOClass: ScoreDTO,
          EntityClass: ORMScore,
          CreateDTOClass: CreateScoreInput,
          UpdateDTOClass: UpdateScoreInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [ScoreService, ScoreResolver, ScoreApplicationService],
})
export class ScoreModule {}
