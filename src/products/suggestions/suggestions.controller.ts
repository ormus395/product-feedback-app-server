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
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SerializeInterceptor } from '../../interceptors/serialize.interceptor';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { SuggestionDto } from './dto/suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { SuggestionsService } from './suggestions.service';

@Controller()
export class SuggestionsController {
  constructor(private suggestionsService: SuggestionsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('suggestions')
  createSuggestion(
    @Param('productId', ParseIntPipe) productId: number,
    @Request() req,
    @Body() body: CreateSuggestionDto,
  ) {
    return this.suggestionsService.create(body, req.user);
  }

  // get suggestion by suggestion type on a product
  @UseInterceptors(new SerializeInterceptor(SuggestionDto))
  @Get('products/:productId/suggestions')
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
  @Patch('suggestions/:suggestionId')
  updateSuggestion(
    @Param('suggestionId', ParseIntPipe) suggestionId: number,
    @Body() body: UpdateSuggestionDto,
    @Request() req: any,
  ) {
    return this.suggestionsService.updateSuggestion(
      body,
      suggestionId,
      req.user,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('suggestions/:suggestionId')
  deleteSuggestion(
    @Param('suggestionId', ParseIntPipe) suggestionId: number,
    @Request() req: any,
  ) {
    // this needs to be changed for better expereince
    return this.suggestionsService.deleteSuggestion(suggestionId, req.user);
  }
}
