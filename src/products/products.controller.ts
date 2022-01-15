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
  Delete,
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

  @Get('/all')
  async getAllProducts() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findById(id);
    return product;
  }

  @Get()
  async findProductsByTitle(@Query('title') title: string, @Query('userId') userId: number) {
    const products = await this.productsService.findProductByTitle(title);
    console.log(products);
    if (products.length < 1) {
      throw new NotFoundException(
        'There doesnt seem to be products with that title.',
      );
    }
    return products;
  }

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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.productsService.deleteProduct(id, req.user);
  }
}
