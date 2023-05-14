import { Injectable } from '@nestjs/common';
import { ObjectLiteral, QueryFailedError, Repository } from 'typeorm';
import { ScoreRepositoryInterface } from '../../../championship/domain/repository/ScoreRepositoryInterface';
import { ORMScore } from '../entities/ORMScore';
import { Score } from '../../../championship/domain/entities/Score';
import { Result } from '../../../../kernel/Result/Result';
import { ScoreFilter } from '../../../championship/filters/ScoreFilter';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScoreRepository implements ScoreRepositoryInterface {
  constructor(
    @InjectRepository(ORMScore)
    private repository: Repository<ORMScore>,
  ) {}

  async persist(instance: Score): Promise<Result<void>> {
    try {
      await this.repository.save(ORMScore.import(instance));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error(e.message));
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Result<Score>> {
    const result = await this.repository.findOne({
      where: { id: id.toString() },
    });
    if (!result) {
      return Result.fail(new Error('not found'));
    }

    return Result.ok<Score>(result.export());
  }

  async findOne(options: ScoreFilter): Promise<Result<Score>> {
    const where: ObjectLiteral = options.where || {};

    try {
      const result = await this.repository.findOne({ where });
      if (!result) {
        return Result.fail(new Error('not found'));
      }

      const score = result.export();
      return Result.ok(score);
    } catch (error) {
      return Result.fail(error);
    }
  }
  async find(): Promise<Result<Score[]>> {
    const result = await this.repository.find();
    const results = result.map((score) => score.export());
    return Result.ok(results);
  }

  async delete(instance: Score): Promise<Result<void>> {
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
