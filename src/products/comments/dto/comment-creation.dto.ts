import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsInt()
  suggestionId: number;
}
