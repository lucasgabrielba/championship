import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ScoreService } from './score.service';
import { ScoreDTO } from '../../../entities/Score/score.dto';
import {
  CreateScoreInput,
  UpdateScoreInput,
} from '../../../entities/Score/score.input';
import { Score } from '../../../infra/database/entities/ORMScore';

@Resolver()
export class ScoreResolver {
  constructor(private service: ScoreService) {}

  @Query(() => [ScoreDTO])
  async allScores(): Promise<Score[]> {
    const result = await this.service.findAll();

    return result;
  }

  @Query(() => ScoreDTO)
  async scoreById(@Args('id') id: string): Promise<Score> {
    const result = await this.service.findById(id);

    return result;
  }

  @Mutation(() => ScoreDTO)
  async createScore(@Args('data') data: CreateScoreInput): Promise<Score> {
    const result = await this.service.createAndSave(data);

    return result;
  }

  @Mutation(() => ScoreDTO)
  async updateScore(
    @Args('id') id: string,
    @Args('data') data: UpdateScoreInput,
  ): Promise<Score> {
    const result = await this.service.updateAndSave(id, data);

    return result;
  }

  @Mutation(() => Boolean)
  async deleteScore(@Args('id') id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result;
  }
}
