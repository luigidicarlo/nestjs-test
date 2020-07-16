import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductSchema } from './product.model'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Product',
          schema: ProductSchema,
          collection: 'products'
        }
      ]
    )
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
