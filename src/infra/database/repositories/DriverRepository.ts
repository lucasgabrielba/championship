import { Injectable } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { ORMDriver } from '../entities/ORMDriver';
import { Result } from '../../../../kernel/Result/Result';
import { DriverRepositoryInterface } from '../../../championship/domain/repository/DriverRepositoryInterface';
import { Driver } from '../../../championship/domain/entities/Driver';
import { DriverFilter } from '../../../championship/filters/DriverFilter';

@Injectable()
export class DriverRepository
  extends Repository<ORMDriver>
  implements DriverRepositoryInterface {
  constructor(dataSource: DataSource) {
    super(ORMDriver, dataSource.createEntityManager());
  }

  async persist(instance: Driver): Promise<Result<void>> {
    try {
      await this.save(ORMDriver.import(instance));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error(e.message));
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Result<Driver>> {
    const result = await this.findOne({
      where: { id: id.toString() },
    });
    if (!result) {
      return Result.fail(new Error('not found'));
    }

    return Result.ok<Driver>(result.export());
  }

  async findOneEntity(where: object): Promise<Result<Driver>> {
    try {
      const result = await this.findOne({ where: where });
      if (!result) {
        return Result.fail(new Error('not found'));
      }

      const Driver = result.export();
      return Result.ok(Driver);
    } catch (error) {
      return Result.fail(error);
    }
  }
  async findEntity(): Promise<Result<Driver[]>> {
    const result = await this.find();
    const results = result.map((Driver) => Driver.export());
    return Result.ok(results);
  }

  async deleteEntity(instance: Driver): Promise<Result<void>> {
    try {
      const entity = await this.findOne({
        where: { id: instance.id.toString() },
      });
      if (!entity) return Result.fail(new Error('invalid'));
      await this.softRemove(entity);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error('invalid'));
      }
      throw e;
    }
  }
}
