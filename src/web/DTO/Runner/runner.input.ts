import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRunnerInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdateRunnerInput extends PartialType(CreateRunnerInput) {
  @Field(() => ID, { nullable: true })
  id?: string;
}
