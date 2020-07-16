import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly Product: Model<Product>
  ) {}

  async addProduct (name: string, description: string, price: number): Promise<Product> {
    try {
      const newProduct = new this.Product({
        name,
        description,
        price
      })
      const saved = await newProduct.save()
      return saved.toObject()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getProducts (): Promise<Product[]> {
    try {
      const products: Product[] = await this.Product.find().exec()
      return products
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getProduct (id: string): Promise<Product> {
    try {
      const product: Product = await this.findProduct(id)
      return product
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async updateProduct (id: string, name: string, description: string, price: number): Promise<Product> {
    try {
      const productToBeUpdated = await this.findProduct(id)
      productToBeUpdated.name = name || productToBeUpdated.name
      productToBeUpdated.description = description || productToBeUpdated.description
      productToBeUpdated.price = price || productToBeUpdated.price
      const saved = await productToBeUpdated.save()
      return saved.toObject()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async deleteProduct (id: string): Promise<Product> {
    const product = await this.findProduct(id)
    await this.Product.findByIdAndDelete(id)
    return product.toObject()
  }

  private async findProduct (id: string): Promise<Product> {
    const product = await this.Product.findById(id)
    if (!product) throw new NotFoundException('Product was not found')
    return product
  }
}
