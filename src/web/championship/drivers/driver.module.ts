import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Driver } from '../../../infra/database/entities/ORMDriver';
import { DriverDTO } from '../../../entities/Driver/driver.dto';
import {
  CreateDriverInput,
  UpdateDriverInput,
} from '../../../entities/Driver/driver.input';
import { DriverResolver } from './driver.resolver';
import { DriverService } from './driver.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Driver])],
      resolvers: [
        {
          DTOClass: DriverDTO,
          EntityClass: Driver,
          CreateDTOClass: CreateDriverInput,
          UpdateDTOClass: UpdateDriverInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [DriverService, DriverResolver],
})
export class DriversModule {}
