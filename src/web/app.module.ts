import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ChampionshipsModule } from './championship/championships/championships.module';
import { RunnersModule } from './championship/runners/runners.module';
import { ScoreModule } from './championship/scores/score.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/web/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
    ChampionshipsModule,
    RunnersModule,
    ScoreModule,
  ],
})
export class AppModule {}
