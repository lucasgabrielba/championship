import {
  CreateChampionshipDTO,
  UpdateChampionshipDTO,
} from '../../DTO/ChampionshipDTO';
import { NotFoundException } from '@nestjs/common';
import { ChampionshipCoreService } from '../../domain/CoreService/ChampionshipCoreService';
import { Championship } from '../../domain/entities/Championship';

export class ChampionshipApplicationService {
  constructor(protected service: ChampionshipCoreService) {
    this.service = service;
  }

  async getById(id: string): Promise<Championship | NotFoundException> {
    const result = await this.service.getById(id);
    if (!result) {
      return new NotFoundException('Championship not found');
    }

    return result;
  }

  async getAll(): Promise<Championship[]> {
    const result = await this.service.getAll();

    return result;
  }

  async filter(): Promise<Championship | NotFoundException> {
    const result = await this.service.filter();
    if (!result) {
      return new NotFoundException('Championship not found');
    }

    return result;
  }

  async create(
    data: CreateChampionshipDTO,
  ): Promise<Championship | NotFoundException> {
    const result = await this.service.create(data);

    if (!result) {
      return new NotFoundException('Championship not found');
    }

    return result;
  }

  async update(
    data: UpdateChampionshipDTO,
  ): Promise<Championship | NotFoundException> {
    const result = await this.service.update(data);

    if (!result) {
      return new NotFoundException('Championship not found');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result;
  }
}
