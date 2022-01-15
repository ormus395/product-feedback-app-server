import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  Param,
  ParseIntPipe,
  Query,
  Get,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SerializeInterceptor } from '../../interceptors/serialize.interceptor';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { SuggestionDto } from './dto/suggestion.dto';
import { SuggestionsService } from './suggestions.service';

@UseInterceptors(new SerializeInterceptor(SuggestionDto))
@Controller('suggestions')
export class SuggestionsController {
  constructor(private suggestionsService: SuggestionsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createSuggestion(
    @Param('productId', ParseIntPipe) productId: number,
    @Request() req,
    @Body() body: CreateSuggestionDto,
  ) {
    return this.suggestionsService.create(body, req.user);
  }

  // get suggestion by suggestion type on a product
  @Get()
  getAllBySuggestionType(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('suggestionType') suggestionType,
  ) {
    if (suggestionType === 'all') {
      return this.suggestionsService.findAll(productId);
    }
    return this.suggestionsService.findAllById(productId, suggestionType);
  }

  // update suggestion
  // should just sent suggestion id via json
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  updateSuggestion() {}
}
