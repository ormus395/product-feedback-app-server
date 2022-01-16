import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateSuggestionDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  body: string;
}
