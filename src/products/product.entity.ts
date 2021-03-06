import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Suggestion } from './suggestions/suggestion.entity';
import { User } from '../users/user.entity';
import { SuggestionType } from './suggestion-types/suggestion-type.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => SuggestionType, (suggestionType) => suggestionType.product, {
    onDelete: 'CASCADE',
  })
  suggestionTypes: SuggestionType[];

  @OneToMany(() => Suggestion, (suggestion) => suggestion.product, {
    onDelete: 'CASCADE',
  })
  suggestions: Suggestion[];
}
