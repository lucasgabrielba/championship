import { Module, Global } from '@nestjs/common';
import { ChampionshipRepository } from './ChampionshipRepository';
import { ScoreRepository } from './ScoreRepository';
import { DriverRepository } from './DriverRepository';
import { DatabaseModule } from '../database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [ChampionshipRepository, DriverRepository, ScoreRepository],
  exports: [ChampionshipRepository, DriverRepository, ScoreRepository],
})
export class RepositoryModule {}
