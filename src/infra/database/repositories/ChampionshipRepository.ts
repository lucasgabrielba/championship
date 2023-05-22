import { Injectable } from '@nestjs/common';
import {
  DataSource,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { ChampionshipRepositoryInterface } from '../../../championship/domain/repository/ChampionshipRepositoryInterface';
import { ORMChampionship } from '../entities/ORMChampionship';
import { Championship } from '../../../championship/domain/entities/Championship';
import { Result } from '../../../../kernel/Result/Result';
import { ChampionshipFilter } from '../../../championship/filters/ChampionshipFilter';

@Injectable()
export class ChampionshipRepository
  extends Repository<ORMChampionship>
  implements ChampionshipRepositoryInterface {
  constructor(dataSource: DataSource) {
    super(ORMChampionship, dataSource.createEntityManager());
  }

  async persist(instance: Championship): Promise<Result<void>> {
    try {
      await this.save(ORMChampionship.import(instance));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error(e.message));
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Result<Championship>> {
    const result = await this.findOne({
      where: { id: id.toString() },
    });
    if (!result) {
      return Result.fail(new Error('not found'));
    }

    return Result.ok<Championship>(result.export());
  }

  async findOneEntity(
    options: ChampionshipFilter,
  ): Promise<Result<Championship>> {
    const where: ObjectLiteral = options.where || {};

    try {
      const result = await this.findOne({ where });
      if (!result) {
        return Result.fail(new Error('not found'));
      }

      const Championship = result.export();
      return Result.ok(Championship);
    } catch (error) {
      return Result.fail(error);
    }
  }
  async findEntity(): Promise<Result<Championship[]>> {
    const result = await this.find();
    const results = result.map((Championship) => Championship.export());
    return Result.ok(results);
  }

  async deleteEntity(instance: Championship): Promise<Result<void>> {
    try {
      const entity = await this.findOne({
        where: { id: instance.id },
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
