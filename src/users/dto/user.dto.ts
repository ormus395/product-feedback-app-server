import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: number;

  @Expose()
  avatarUrl: string;

  @Expose()
  name: string;
}
