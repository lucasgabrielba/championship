import { Entity, Column, OneToMany } from 'typeorm';
import { ORMScore } from './ORMScore';
import { ORMBase } from './utils/ORMBase';
import { Driver } from '../../../championship/domain/entities/Driver';
import { DriverDTO } from '../../../championship/DTO/DriverDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
@Entity('Driver')
export class ORMDriver extends ORMBase {
  @Column()
  name: string;

  @Column({ type: 'integer' })
  won: number;

  @Column({ type: 'integer' })
  lost: number;

  @OneToMany(() => ORMScore, (score) => score.driver, { onDelete: 'CASCADE' })
  scores?: ORMScore[];

  static import(instance: Driver): ORMDriver {
    const entity = new ORMDriver();
    entity.id = instance.id;

    entity.name = instance.name;
    entity.won = instance.won;
    entity.lost = instance.lost;

    entity.createdAt = instance.createdAt;
    entity.updatedAt = instance.updatedAt;
    entity.deletedAt = instance.deletedAt;

    return entity;
  }

  export(): Driver {
    const dto: DriverDTO = {
      id: this.id,

      name: this.name,
      won: this.won,
      lost: this.lost,

      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
    };

    return Driver.reconstitute(dto).data;
  }
}
