import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ORMRunner } from '../../../infra/entities/ORMRunner';
import { RunnerDTO } from '../../DTO/Runner/runner.dto';
import {
  CreateRunnerInput,
  UpdateRunnerInput,
} from '../../DTO/Runner/runner.input';
import { RunnerResolver } from './runner.resolver';
import { RunnerService } from './runner.service';
import { runnerApplicationService } from '../../../championship/aplication/service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ORMRunner])],
      resolvers: [
        {
          DTOClass: RunnerDTO,
          EntityClass: ORMRunner,
          CreateDTOClass: CreateRunnerInput,
          UpdateDTOClass: UpdateRunnerInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [RunnerService, RunnerResolver, runnerApplicationService],
})
export class RunnersModule {}
