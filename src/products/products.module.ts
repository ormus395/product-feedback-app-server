import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { RouterModule } from '@nestjs/core';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { SuggestionType } from './suggestion-types/suggestion-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SuggestionType])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
