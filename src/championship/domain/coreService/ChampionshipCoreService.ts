import { ORMChampionship } from '../../../infra/database/entities/ORMChampionship';
import { ChampionshipRrepositoryInterface } from '../repository/ChampionshipRepositoryInterface';
import { NotFoundException } from '@nestjs/common';

export class ChampionshipCoreService {
  constructor(protected repository: ChampionshipRrepositoryInterface) {
    this.repository = repository;
  }

  async getById(id: string): Promise<ORMChampionship | NotFoundException> {
    const result = await this.repository.getById(id);
    if (!result) {
      return new NotFoundException('championship not found');
    }

    return result;
  }

  async getAll(): Promise<ORMChampionship[]> {
    const result = await this.repository.getAll();

    return result;
  }

  async filter(): Promise<ORMChampionship | NotFoundException> {
    const result = await this.repository.filter();
    if (!result) {
      return new NotFoundException('championship not found');
    }

    return result;
  }

  async create(
    data: CreateChampionshipDTO,
  ): Promise<ORMChampionship | NotFoundException> {
    const result = await this.repository.create(data);

    if (!result) {
      return new NotFoundException('championship not found');
    }

    return result;
  }

  async update(
    data: UpdateChampionshipDTO,
  ): Promise<ORMChampionship | NotFoundException> {
    const result = await this.repository.update(data);

    if (!result) {
      return new NotFoundException('championship not found');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    return result;
  }
}
