import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from '../product.entity';
import { Suggestion } from '../suggestions/suggestion.entity';

@Entity()
export class SuggestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Product, (product) => product.suggestionTypes)
  product: Product;

  @OneToMany(() => Suggestion, (suggestion) => suggestion.suggestionType)
  suggestions: Suggestion[];
}
