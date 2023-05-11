import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ORMChampionship } from '../../../infra/entities/ORMChampionship';
import { ChampionshipDTO } from '../../DTO/Championship/championship.dto';
import { ChampionshipResolver } from './championship.resolver';
import { ChampionshipService } from './championship.service';
import {
  CreateChampionshipInput,
  UpdateChampionshipInput,
} from '../../DTO/Championship/championship.input';
import { ChampionshipApplicationService } from '../../../championship/aplication/service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ORMChampionship])],
      resolvers: [
        {
          DTOClass: ChampionshipDTO,
          EntityClass: ORMChampionship,
          CreateDTOClass: CreateChampionshipInput,
          UpdateDTOClass: UpdateChampionshipInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [
    ChampionshipService,
    ChampionshipResolver,
    ChampionshipApplicationService,
  ],
})
export class ChampionshipsModule {}
