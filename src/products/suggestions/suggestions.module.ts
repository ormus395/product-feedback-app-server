import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from './suggestion.entity';
import { Product } from '../product.entity';
import { SuggestionType } from '../suggestion-types/suggestion-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion, Product, SuggestionType])],
  providers: [SuggestionsService],
  controllers: [SuggestionsController],
})
export class SuggestionsModule {}
