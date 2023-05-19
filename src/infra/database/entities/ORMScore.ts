import { Entity, Column, ManyToOne } from 'typeorm';
import { ORMBase } from './utils/ORMBase';
import { ORMChampionship } from './ORMChampionship';
import { ORMDriver } from './ORMDriver';
import { Score } from '../../../championship/domain/entities/Score';
import { ScoreDTO } from '../../../championship/DTO/ScoreDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
@Entity('Score')
export class ORMScore extends ORMBase {
  @ManyToOne(() => ORMChampionship, (championship) => championship.scores)
  championship: ORMChampionship;
  @Column()
  championshipId: string;

  @ManyToOne(() => ORMDriver, (driver) => driver.scores)
  driver: ORMDriver;
  @Column()
  driverId: string;

  @Column('integer')
  score: number;

  static import(instance: Score): ORMScore {
    const entity = new ORMScore();
    entity.id = instance.id;

    entity.championship = ORMChampionship.import(instance.championship);
    entity.driver = ORMDriver.import(instance.driver);
    entity.score = instance.score;

    entity.createdAt = instance.createdAt;
    entity.updatedAt = instance.updatedAt;
    entity.deletedAt = instance.deletedAt;

    return entity;
  }

  export(): Score {
    const dto: ScoreDTO = {
      id: this.id,

      championship: this.championship.export().toDTO(),
      driver: this.driver.export().toDTO(),
      score: this.score,

      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
    };

    return Score.reconstitute(dto).data;
  }
}
