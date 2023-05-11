import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ORMChampionship } from '../entities/ORMChampionship';
import {
  CreateChampionshipInput,
  UpdateChampionshipInput,
} from '../../web/DTO/Championship/championship.input';
import { ChampionshipRepositoryInterface } from '../../championship/domain/repositories';

@Injectable()
export class ChampionshipRepository implements ChampionshipRepositoryInterface {
  constructor(
    @InjectRepository(ORMChampionship)
    private championshipRepository: Repository<ORMChampionship>,
  ) {}

  async findAll(): Promise<ORMChampionship[]> {
    const result = await this.championshipRepository.find();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all championship');
    }

    return result;
  }

  async findById(id: string): Promise<ORMChampionship> {
    const result = await this.championshipRepository.findOne({
      where: { id: id },
    });

    if (!result) {
      throw new InternalServerErrorException(
        `Error fetching id Championship: ${id}.`,
      );
    }

    return result;
  }

  async createAndSave(data: CreateChampionshipInput): Promise<ORMChampionship> {
    const created = this.championshipRepository.create(data);
    const saved = await this.championshipRepository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error creating championship.');
    }

    return saved;
  }

  async updateAndSave(
    id: string,
    data: UpdateChampionshipInput,
  ): Promise<ORMChampionship> {
    const championship = await this.findById(id);

    if (!championship) {
      throw new InternalServerErrorException(
        'It was not possible to make the update, championship not found.',
      );
    }

    await this.championshipRepository.update(championship, { ...data });
    const created = this.championshipRepository.create({
      ...championship,
      ...data,
    });
    const saved = this.championshipRepository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error updating championship.');
    }

    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const championship = await this.findById(id);

    if (!championship) {
      throw new InternalServerErrorException(
        `Error fetching id championship: ${id}.`,
      );
    }

    const deleted = await this.championshipRepository.softDelete(id);

    if (deleted) {
      return true;
    }

    return false;
  }
}
