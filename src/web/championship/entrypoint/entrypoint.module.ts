import { Module, Global } from '@nestjs/common';
import { ChampionshipEntrypoint } from './championship.entrypoint';
import { DriverEntrypoint } from './driver.entrypoint';
import { ScoreEntrypoint } from './score.entrypoint';
import { RepositoryModule } from '../../../infra/database/repositories/repository.module';

@Global()
@Module({
  imports: [RepositoryModule],
  providers: [ChampionshipEntrypoint, DriverEntrypoint, ScoreEntrypoint],
  exports: [ChampionshipEntrypoint, DriverEntrypoint, ScoreEntrypoint],
})
export class EntrypointModule {}
