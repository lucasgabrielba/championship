import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infra/database/database.module';
import { WebModule } from 'championship.module';
import { EntrypointModule } from 'entrypoint/entrypoint.module';
import { RepositoryModule } from '../infra/database/repositories/repository.module';
import { ORMModule } from '../infra/database/entities/orm.module';

@Module({
  imports: [
    ORMModule,
    ConfigModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    WebModule,
    EntrypointModule,
    RepositoryModule,
  ],
})
export class AppModule {}
