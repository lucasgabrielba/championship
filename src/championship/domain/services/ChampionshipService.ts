import { CreateChampionshipInput, UpdateChampionshipInput } from 'DTO';
import { Championship } from '../entities';
import { ChampionshipRepositoryInterface } from '../repositories';
import { RunnerService } from './RunnerService';

export class ChampionshipService {
  constructor(
    private repository: ChampionshipRepositoryInterface,
    private readonly runnerService: RunnerService,
  ) {
    this.runnerService = runnerService;
  }

  async getAll(): Promise<Championship[]> {
    const result = await this.repository.findAll();

    if (!result) {
      new Error();
    }

    let championshipArray: Championship[];
    for (const championship of result) {
      championshipArray.push(new Championship(championship));
    }

    return championshipArray;
  }

  async getById(id: string): Promise<Championship> {
    const result = await this.repository.findById(id);

    if (!result) {
      new Error();
    }

    const championship = new Championship(result);

    return championship;
  }

  async create(
    championshipDTO: CreateChampionshipInput,
  ): Promise<Championship> {
    const result = await this.repository.createAndSave(championshipDTO);

    if (!result) {
      new Error();
    }

    const championship = new Championship(result);

    return championship;
  }

  async update(
    id: string,
    championshipDTO: UpdateChampionshipInput,
  ): Promise<Championship> {
    const result = await this.repository.updateAndSave(id, championshipDTO);

    if (!result) {
      new Error();
    }

    const championship = new Championship(result);

    return championship;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    if (!result) {
      new Error();
    }

    return result;
  }
}
