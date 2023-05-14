import { Injectable } from '@nestjs/common';
import { ObjectLiteral, QueryFailedError, Repository } from 'typeorm';
import { DriverRepositoryInterface } from '../../../championship/domain/repository/DriverRepositoryInterface';
import { ORMDriver } from '../entities/ORMDriver';
import { Driver } from '../../../championship/domain/entities/Driver';
import { Result } from '../../../../kernel/Result/Result';
import { DriverFilter } from '../../../championship/filters/DriverFilter';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DriverRepository implements DriverRepositoryInterface {
  constructor(
    @InjectRepository(ORMDriver)
    private repository: Repository<ORMDriver>,
  ) {}

  async persist(instance: Driver): Promise<Result<void>> {
    try {
      await this.repository.save(ORMDriver.import(instance));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error(e.message));
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Result<Driver>> {
    const result = await this.repository.findOne({
      where: { id: id.toString() },
    });
    if (!result) {
      return Result.fail(new Error('not found'));
    }

    return Result.ok<Driver>(result.export());
  }

  async findOne(options: DriverFilter): Promise<Result<Driver>> {
    const where: ObjectLiteral = options.where || {};

    try {
      const result = await this.repository.findOne({ where });
      if (!result) {
        return Result.fail(new Error('not found'));
      }

      const Driver = result.export();
      return Result.ok(Driver);
    } catch (error) {
      return Result.fail(error);
    }
  }
  async find(): Promise<Result<Driver[]>> {
    const result = await this.repository.find();
    const results = result.map((Driver) => Driver.export());
    return Result.ok(results);
  }

  async delete(instance: Driver): Promise<Result<void>> {
    try {
      const entity = await this.repository.findOne({
        where: { id: instance.id.toString() },
      });
      if (!entity) return Result.fail(new Error('invalid'));
      await this.repository.softRemove(entity);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error('invalid'));
      }
      throw e;
    }
  }
}
