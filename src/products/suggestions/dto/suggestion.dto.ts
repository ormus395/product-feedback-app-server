import { Expose, Transform } from 'class-transformer';

export class SuggestionDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  body: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Transform(({ obj }) => obj.product.id)
  @Expose()
  productId: number;

  @Transform(({ obj }) => obj.suggestionType.id)
  @Expose()
  suggestionTypeId: number;
}
