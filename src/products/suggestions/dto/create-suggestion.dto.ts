import { IsInt, IsString } from 'class-validator';
export class CreateSuggestionDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsInt()
  productId: number;

  @IsInt()
  suggestionTypeId: number;
}
