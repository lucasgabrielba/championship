import {
  CreateChampionshipInput,
  UpdateChampionshipInput,
} from '../../../web/DTO';
import { Championship } from '../../domain/entities';
import { ChampionshipService } from '../../domain/services/ChampionshipService';

export class ChampionshipApplicationService {
  constructor(private service: ChampionshipService) {}

  async getOne(id: string): Promise<Championship> {
    const championship = await this.service.getById(id);

    if (!championship) {
      new Error();
    }

    return championship;
  }

  async getAll(): Promise<Championship[]> {
    const result = await this.service.getAll();

    if (!result) {
      new Error();
    }

    return result;
  }

  async create(
    championshipDTO: CreateChampionshipInput,
  ): Promise<Championship> {
    const championshipCreated = await this.service.create(championshipDTO);

    if (!championshipCreated) {
      new Error();
    }

    return championshipCreated;
  }

  async update(
    id: string,
    championshipDTO: UpdateChampionshipInput,
  ): Promise<Championship> {
    const championshipUpdated = await this.service.update(id, championshipDTO);

    if (!championshipUpdated) {
      new Error();
    }

    return championshipUpdated;
  }

  async delete(id: string): Promise<boolean> {
    const championshipDeleted = await this.service.delete(id);

    if (!championshipDeleted) {
      new Error();
    }

    return championshipDeleted;
  }
}
