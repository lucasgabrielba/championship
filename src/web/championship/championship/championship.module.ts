import { Module } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMChampionship } from '../../../infra/database/entities/ORMChampionship';

@Module({
  imports: [TypeOrmModule.forFeature([ORMChampionship])],
  providers: [ChampionshipService],
  controllers: [ChampionshipController],
})
export class ChampionshipModule {}
