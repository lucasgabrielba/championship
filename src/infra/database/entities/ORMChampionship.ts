import { Column, Entity, OneToMany } from 'typeorm';
import { ORMScore } from './ORMScore';
import { ORMBase } from './utils/ORMBase';
import { Championship } from '../../../championship/domain/entities/Championship';
import { ChampionshipDTO } from '../../../championship/DTO/ChampionshipDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
@Entity('Championship')
export class ORMChampionship extends ORMBase {
  @Column()
  name: string;

  @Column('integer')
  stage: number;

  @Column('integer')
  rounds: number;

  @Column({ nullable: true })
  bet: string;

  @OneToMany(() => ORMScore, (score) => score.championship, {
    onDelete: 'CASCADE',
  })
  scores?: ORMScore[];

  static import(instance: Championship): ORMChampionship {
    const entity = new ORMChampionship();
    entity.id = instance.id;

    entity.name = instance.name;
    entity.rounds = instance.rounds;
    entity.stage = instance.stage;
    entity.bet = instance.bet;

    entity.createdAt = instance.createdAt;
    entity.updatedAt = instance.updatedAt;
    entity.deletedAt = instance.deletedAt;

    return entity;
  }

  export(): Championship {
    const dto: ChampionshipDTO = {
      id: this.id,

      name: this.name,
      rounds: this.rounds,
      stage: this.stage,
      bet: this.bet,

      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
    };

    return Championship.reconstitute(dto).data;
  }
}
