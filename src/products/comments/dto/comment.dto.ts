import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  body: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Transform(({ obj }) => obj.suggestion.id)
  @Expose()
  suggestionId: number;
}
