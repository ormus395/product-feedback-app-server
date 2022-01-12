import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  suggestionTypes: string[];
}
