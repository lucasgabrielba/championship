import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateScoreInput {
  @IsInt()
  @IsNotEmpty()
  points: number;

  @IsString()
  @IsNotEmpty()
  championshipId: string;

  @IsString()
  @IsNotEmpty()
  runnerId: string;
}

@InputType()
export class UpdateScoreInput extends PartialType(CreateScoreInput) {
  @Field(() => ID, { nullable: true })
  id?: string;
}
