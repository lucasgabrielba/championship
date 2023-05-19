import { Module, Global } from '@nestjs/common';
import { ChampionshipEntrypoint } from './championship.entrypoint';
import { DriverEntrypoint } from './driver.entrypoint';
import { ScoreEntrypoint } from './score.entrypoint';

@Global()
@Module({
  providers: [ChampionshipEntrypoint, DriverEntrypoint, ScoreEntrypoint],
  exports: [ChampionshipEntrypoint, DriverEntrypoint, ScoreEntrypoint],
})
export class EntrypointModule {}
