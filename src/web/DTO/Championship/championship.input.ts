import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateChampionshipInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  stage: number;

  @IsInt()
  @IsNotEmpty()
  rounds: number;
}

@InputType()
export class UpdateChampionshipInput extends PartialType(
  CreateChampionshipInput,
) {
  @Field(() => ID, { nullable: true })
  id?: string;
}
