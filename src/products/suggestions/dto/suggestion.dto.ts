import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SuggestionDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  body: string;

  @IsOptional()
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @IsOptional()
  @Transform(({ obj }) => obj.product.id)
  @Expose()
  productId: number;

  @IsOptional()
  @Transform(({ obj }) => obj.suggestionType.id)
  @Expose()
  suggestionTypeId: number;
}
