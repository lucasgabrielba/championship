import { Module, Global } from '@nestjs/common';
import { ChampionshipRepository } from './ChampionshipRepository';
import { ScoreRepository } from './ScoreRepository';
import { DriverRepository } from './DriverRepository';
import { ORMChampionship } from '../entities/ORMChampionship';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMDriver } from '../entities/ORMDriver';
import { ORMScore } from '../entities/ORMScore';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ORMChampionship, ORMDriver, ORMScore])],
  providers: [ChampionshipRepository, DriverRepository, ScoreRepository],
  exports: [ChampionshipRepository, DriverRepository, ScoreRepository],
})
export class RepositoryModule {}
