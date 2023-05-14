import { Entity, Column, OneToMany } from 'typeorm';
import { ORMScore } from './ORMScore';
import { ORMBase } from './utils/ORMBase';
import { Driver } from '../../../championship/domain/entities/Driver';
import { DriverDTO } from '../../../championship/DTO/DriverDTO';

@Entity()
export class ORMDriver extends ORMBase {
  @Column()
  name: string;

  @OneToMany(() => ORMScore, (score) => score.driver, { onDelete: 'CASCADE' })
  scores?: ORMScore[];

  static import(instance: Driver): ORMDriver {
    const entity = new ORMDriver();
    entity.id = instance.id;

    entity.name = instance.name;

    entity.createdAt = instance.createdAt;
    entity.updatedAt = instance.updatedAt;
    entity.deletedAt = instance.deletedAt;

    return entity;
  }

  export(): Driver {
    const dto: DriverDTO = {
      id: this.id,

      name: this.name,

      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
      deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
    };

    return Driver.reconstitute(dto).data;
  }
}
