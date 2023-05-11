import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ORMScore } from '../entities/ORMScore';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../web/DTO/Score/score.input';
import { ScoreRepositoryInterface } from '../../championship/domain/repositories';

@Injectable()
export class ScoreRepository implements ScoreRepositoryInterface {
  constructor(
    @InjectRepository(ORMScore)
    private scoreRepository: Repository<ORMScore>,
  ) {}

  async findAll(): Promise<ORMScore[]> {
    const result = await this.scoreRepository.find();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all scores');
    }

    return result;
  }

  async findById(id: string): Promise<ORMScore> {
    const result = await this.scoreRepository.findOne({
      where: { id: id },
    });

    if (!result) {
      throw new InternalServerErrorException(`Error fetching id score: ${id}.`);
    }

    return result;
  }

  async createAndSave(data: CreateScoreInput): Promise<ORMScore> {
    const created = this.scoreRepository.create(data);
    const saved = await this.scoreRepository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error creating score.');
    }

    return saved;
  }

  async updateAndSave(id: string, data: UpdateScoreInput): Promise<ORMScore> {
    const score = await this.findById(id);
    if (!score) {
      throw new InternalServerErrorException(
        'It was not possible to make the update, score not found.',
      );
    }

    await this.scoreRepository.update(score, { ...data });
    const created = this.scoreRepository.create({
      ...score,
      ...data,
    });
    const saved = this.scoreRepository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error updating score.');
    }

    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const score = await this.findById(id);

    if (!score) {
      throw new InternalServerErrorException(`Error fetching id score: ${id}.`);
    }

    const deleted = await this.scoreRepository.softDelete(id);

    if (deleted) {
      return true;
    }

    return false;
  }
}
