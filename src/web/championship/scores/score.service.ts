import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from '../../../infra/database/entities/ORMScore';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../../entities/Score/score.input';
import { ScoreFilters } from '../../../entities/Score/score.filter';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private repository: Repository<Score>,
  ) {}

  async findAll(): Promise<Score[]> {
    const result = await this.repository.find();

    if (!result) {
      throw new NotFoundException('Error fetching all championship');
    }

    return result;
  }

  async filter(filter: ScoreFilters): Promise<Score> {
    let result;

    if (filter.id) {
      result = await this.repository.findOne({
        where: { id: filter.id },
      });
    }

    if (filter.championshipId) {
      result = await this.repository.findOne({
        where: { championshipId: filter.championshipId },
      });
    }

    if (filter.driverId) {
      result = await this.repository.findOne({
        where: { driverId: filter.driverId },
      });
    }

    if (filter.points) {
      result = await this.repository.findOne({
        where: { points: filter.points },
      });
    }

    if (!result) {
      throw new NotFoundException(`Error fetching score.`);
    }

    return result;
  }

  async findById(id: string): Promise<Score> {
    const result = await this.repository.findOne({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException(`Error fetching id Championship: ${id}.`);
    }

    return result;
  }

  async createAndSave(data: CreateScoreInput): Promise<Score> {
    const created = this.repository.create(data);
    const saved = await this.repository.save(created);

    if (!saved) {
      throw new NotFoundException('Error creating championship.');
    }

    return saved;
  }

  async updateAndSave(id: string, data: UpdateScoreInput): Promise<Score> {
    const championship = await this.findById(id);

    if (!championship) {
      throw new NotFoundException(
        'It was not possible to make the update, championship not found.',
      );
    }

    await this.repository.update(championship, { ...data });
    const created = this.repository.create({
      ...championship,
      ...data,
    });
    const saved = this.repository.save(created);

    if (!saved) {
      throw new NotFoundException('Error updating championship.');
    }

    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const championship = await this.findById(id);

    if (!championship) {
      throw new NotFoundException(`Error fetching id championship: ${id}.`);
    }

    const deleted = await this.repository.softDelete(id);

    if (deleted) {
      return true;
    }

    return false;
  }
}
