import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RunnerDTO } from '../../DTO/Runner/Runner.dto';
import {
  CreateRunnerInput,
  UpdateRunnerInput,
} from '../../DTO/Runner/Runner.input';
import { Runner } from '../../../championship/domain/entities';
import { RunnerService } from './runner.service';

@Resolver()
export class RunnerResolver {
  constructor(private service: RunnerService) {}

  @Query(() => [RunnerDTO])
  async allRunners(): Promise<Runner[]> {
    const result = await this.service.findAll();

    return result;
  }

  @Query(() => RunnerDTO)
  async RunnerById(@Args('id') id: string): Promise<Runner> {
    const result = await this.service.findById(id);

    return result;
  }

  @Mutation(() => RunnerDTO)
  async createRunner(@Args('data') data: CreateRunnerInput): Promise<Runner> {
    const result = await this.service.create(data);

    return result;
  }

  @Mutation(() => RunnerDTO)
  async updateRunner(
    @Args('id') id: string,
    @Args('data') data: UpdateRunnerInput,
  ): Promise<Runner> {
    const result = await this.service.update(id, data);

    return result;
  }

  @Mutation(() => Boolean)
  async deleteRunner(@Args('id') id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result;
  }
}
