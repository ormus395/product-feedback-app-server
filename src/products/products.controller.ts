import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  Query,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@UseInterceptors(new SerializeInterceptor(ProductDto))
@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProduct(@Request() req, @Body() body: CreateProductDto) {
    console.log(req);
    return this.productsService.create(body, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateProductTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
    @Request() req,
  ) {
    return this.productsService.updateProductTitle(body.title, id, req.user);
  }

  @Get('/:id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findById(id);
    return product;
  }

  @Get()
  async findProductsByTitle(@Query('title') title: string) {
    const products = await this.productsService.findProductByTitle(title);
    console.log(products);
    if (products.length < 1) {
      throw new NotFoundException(
        'There doesnt seem to be products with that title.',
      );
    }
    return products;
  }
}
