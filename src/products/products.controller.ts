import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'
import { Product } from './product.model'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Product {
    return this.productsService.getProduct(id)
  }

  @Post()
  addProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number
  ): Product {
    return this.productsService.addProduct(name, description, price)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number
  ): Product {
    return this.productsService.updateProduct(id, name, description, price)
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Product {
    return this.productsService.deleteProduct(id)
  }
}
