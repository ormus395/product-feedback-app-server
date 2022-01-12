import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from '../product.entity';
import { User } from '../../users/user.entity';
import { SuggestionType } from '../suggestion-types/suggestion-type.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({
    default: '0',
  })
  votes: number;

  @ManyToOne(() => Product, (product) => product.suggestions)
  product: Product;

  @ManyToOne(
    () => SuggestionType,
    (suggestionType) => suggestionType.suggestions,
  )
  suggestionType: SuggestionType;

  @ManyToOne(() => User, (user) => user.suggestions)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.suggestion)
  comments: Comment[];
}
