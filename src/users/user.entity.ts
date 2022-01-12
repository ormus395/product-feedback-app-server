import { Exclude } from 'class-transformer';
import { report } from 'process';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Suggestion } from '../products/suggestions/suggestion.entity';
import { Comment } from '../products/comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  avatarUrl: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Suggestion, (suggestion) => suggestion.user)
  suggestions: Suggestion[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user', this.id);
  }
}
