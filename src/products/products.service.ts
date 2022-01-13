import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from '../users/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SuggestionType } from './suggestion-types/suggestion-type.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
    @InjectRepository(SuggestionType)
    private suggestionTypeRepo: Repository<SuggestionType>,
  ) {}

  async create(body: CreateProductDto, user: User) {
    const product = this.repo.create({ title: body.title });

    product.user = user;

    const savedRepo = await this.repo.save(product);

    for (let type of body.suggestionTypes) {
      const newSuggestionType: SuggestionType = this.suggestionTypeRepo.create({
        title: type,
      });

      try {
        newSuggestionType.product = product;
        await this.suggestionTypeRepo.save(newSuggestionType);
      } catch (err) {
        console.log('Saving suggestion type did not work');
      }
    }

    return savedRepo;
  }

  async findById(id: number) {
    return this.repo
      .createQueryBuilder('product')
      .where({ id })
      .leftJoinAndSelect('product.user', 'user')
      .getOne();
  }

  // returns all of the products
  async findAll() {
    return this.repo.find();
  }

  async findProductByTitle(title: string) {
    return this.repo
      .createQueryBuilder('product')
      .where({ title: title })
      .leftJoinAndSelect('product.user', 'user')
      .getMany();
  }

  // updates for products
  // change product title
  async updateProductTitle(title: string, productId: number, user: User) {
    // find the product by id
    const productToUpdate = await this.repo
      .createQueryBuilder('product')
      .select('product')
      .where('product.id = :id', { id: productId })
      .leftJoinAndSelect('product.user', 'user')
      .getOne();

    if (productToUpdate.user.id !== user.id) {
      throw new UnauthorizedException('This is not your product to update');
    }

    productToUpdate.title = title;

    return this.repo.save(productToUpdate);
  }
}
