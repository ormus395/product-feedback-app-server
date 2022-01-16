import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { User } from '../../users/user.entity';
import { Suggestion } from './suggestion.entity';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
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

  // update the suggestions title or body
  async updateSuggestion(
    updateSuggstionDto: Partial<UpdateSuggestionDto>,
    suggestionId: number,
    user: User,
  ) {
    // find suggestion by id
    const suggestionToUpdate = await this.repo.findOne(suggestionId, {
      relations: ['user'],
    });

    if (!suggestionToUpdate) {
      throw new NotFoundException('A Suggestion with that ID does not exist');
    }

    if (suggestionToUpdate.user.id !== user.id) {
      throw new UnauthorizedException('This is not your suggestion to update');
    }

    Object.assign(suggestionToUpdate, updateSuggstionDto);

    return this.repo.save(suggestionToUpdate);
  }

  async deleteSuggestion(suggestionId: number, user: User) {
    const deleteResults = await this.repo
      .createQueryBuilder()
      .delete()
      .where('id = :suggestionId', { suggestionId })
      .andWhere('suggestion.userId = :userId', { userId: user.id })
      .execute();

    if (deleteResults.affected > 0) {
      return true;
    }

    return false;
  }
}
