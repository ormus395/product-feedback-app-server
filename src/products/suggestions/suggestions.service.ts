import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { User } from '../../users/user.entity';
import { Suggestion } from './suggestion.entity';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { SuggestionType } from '../suggestion-types/suggestion-type.entity';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    private repo: Repository<Suggestion>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(SuggestionType)
    private suggestionTypeRepo: Repository<SuggestionType>,
  ) {}

  async create(body: CreateSuggestionDto, user: User) {
    const suggestion = this.repo.create({ title: body.title, body: body.body });
    suggestion.user = user;
    suggestion.product = await this.productRepo.findOne(body.productId);
    suggestion.suggestionType = await this.suggestionTypeRepo.findOne(
      body.suggestionTypeId,
    );

    return this.repo.save(suggestion);
  }

  async findAll(productId: number) {
    return await this.repo
      .createQueryBuilder('suggestion')
      .select('suggestion')
      .where('suggestion.productId = :id', { id: productId })
      .leftJoinAndSelect('suggestion.user', 'user')
      .leftJoinAndSelect('suggestion.product', 'product')
      .leftJoinAndSelect('suggestion.suggestionType', 'suggestionType')
      .getMany();
  }

  async findAllById(productId: number, suggestionTypeId: number) {
    return await this.repo
      .createQueryBuilder('suggestion')
      .select('suggestion')
      .where('suggestion.productId = :productId', { productId })
      .andWhere('suggestion.suggestionTypeId = :suggestionTypeId', {
        suggestionTypeId,
      })
      .leftJoinAndSelect('suggestion.user', 'user')
      .leftJoinAndSelect('suggestion.product', 'product')
      .leftJoinAndSelect('suggestion.suggestionType', 'suggestionType')
      .getOne();
  }
}
