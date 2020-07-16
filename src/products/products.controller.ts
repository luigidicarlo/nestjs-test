import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'
import { Product, SimplifiedProduct } from './product.model'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<SimplifiedProduct[]> {
    return this.productsService.getProducts()
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<SimplifiedProduct> {
    return this.productsService.getProduct(id)
  }

  @Post()
  async addProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number
  ): Promise<SimplifiedProduct> {
    return this.productsService.addProduct(name, description, price)
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number
  ): Promise<SimplifiedProduct> {
    return this.productsService.updateProduct(id, name, description, price)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<SimplifiedProduct> {
    return this.productsService.deleteProduct(id)
  }
}
