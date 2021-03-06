import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Suggestion } from '../suggestions/suggestion.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Suggestion, (suggestion) => suggestion.comments, {
    onDelete: 'CASCADE',
  })
  suggestion: Suggestion;
}
