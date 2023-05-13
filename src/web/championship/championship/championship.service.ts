import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from '../../../championship/domain/entities/Championship';
import { ChampionshipApplicationService } from '../../../championship/application/service/ChampionshipApplicationService';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectRepository(Championship)
    private readonly applicationService: ChampionshipApplicationService,
  ) {}

  async findAll(): Promise<Championship[]> {
    return this.applicationService.getAll();
  }

  async findOne(id: string): Promise<Championship> {
    return this.applicationService.getById(id);
  }

  async create(championshipData: Championship): Promise<Championship> {
    const championship = this.applicationService.create(championshipData);
    return this.applicationService.save(championship);
  }

  async update(id: number, championshipData: Championship): Promise<void> {
    await this.applicationService.update(id, championshipData);
  }

  async delete(id: number): Promise<void> {
    await this.championshipRepository.delete(id);
  }
}
