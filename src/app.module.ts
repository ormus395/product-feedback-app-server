import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SuggestionsModule } from './products/suggestions/suggestions.module';
import { CommentsModule } from './products/comments/comments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

// entities
import { User } from './users/user.entity';
import { SuggestionType } from './products/suggestion-types/suggestion-type.entity';
import { Suggestion } from './products/suggestions/suggestion.entity';
import { Product } from './products/product.entity';
import { Comment } from './products/comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Suggestion, Product, Comment, SuggestionType],
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Suggestion, Product, Comment],
    //   synchronize: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    SuggestionsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
