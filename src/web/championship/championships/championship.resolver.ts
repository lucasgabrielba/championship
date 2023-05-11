import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChampionshipService } from './championship.service';
import {
  ChampionshipDTO,
  CreateChampionshipInput,
  UpdateChampionshipInput,
} from '../../DTO';

@Resolver()
export class ChampionshipResolver {
  constructor(private service: ChampionshipService) {}

  @Query(() => [ChampionshipDTO])
  async allChampionships(): Promise<ChampionshipDTO[]> {
    const result = await this.service.findAll();

    return result;
  }

  @Query(() => ChampionshipDTO)
  async ChampionshipById(@Args('id') id: string): Promise<ChampionshipDTO> {
    const result = await this.service.findById(id);

    return result;
  }

  @Mutation(() => ChampionshipDTO)
  async createChampionship(
    @Args('data') data: CreateChampionshipInput,
  ): Promise<ChampionshipDTO> {
    const result = await this.service.create(data);

    return result;
  }

  @Mutation(() => ChampionshipDTO)
  async updateChampionship(
    @Args('id') id: string,
    @Args('data') data: UpdateChampionshipInput,
  ): Promise<ChampionshipDTO> {
    const result = await this.service.update(id, data);

    return result;
  }

  @Mutation(() => Boolean)
  async deleteChampionship(@Args('id') id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result;
  }
}
