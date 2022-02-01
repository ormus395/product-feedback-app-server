import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';
import { SuggestionType } from '../suggestion-types/suggestion-type.entity';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  // @Expose()
  // suggestions: Suggestion[];

  @Transform(({ obj }) => obj.suggestionTypes)
  @Expose()
  suggestionTypes: SuggestionType[];
}
