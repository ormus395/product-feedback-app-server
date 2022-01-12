import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
