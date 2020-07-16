import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product, SimplifiedProduct } from './product.model'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly Product: Model<Product>
  ) {}

  async addProduct (name: string, description: string, price: number): Promise<SimplifiedProduct> {
    try {
      const newProduct = new this.Product({
        name,
        description,
        price
      })
      const saved = await newProduct.save()
      return new SimplifiedProduct(saved)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getProducts (): Promise<SimplifiedProduct[]> {
    try {
      const products: Product[] = await this.Product.find().exec()
      return products.map(product => new SimplifiedProduct(product))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getProduct (id: string): Promise<SimplifiedProduct> {
    try {
      const product: Product = await this.findProduct(id)
      return new SimplifiedProduct(product)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async updateProduct (id: string, name: string, description: string, price: number): Promise<SimplifiedProduct> {
    try {
      const productToBeUpdated = await this.findProduct(id)
      productToBeUpdated.name = name || productToBeUpdated.name
      productToBeUpdated.description = description || productToBeUpdated.description
      productToBeUpdated.price = price || productToBeUpdated.price
      const saved = await productToBeUpdated.save()
      return new SimplifiedProduct(saved)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async deleteProduct (id: string): Promise<SimplifiedProduct> {
    const product = await this.findProduct(id)
    await this.Product.findByIdAndDelete(id)
    return new SimplifiedProduct(product)
  }

  private async findProduct (id: string): Promise<Product> {
    const product = await this.Product.findById(id)
    if (!product) throw new NotFoundException('Product was not found')
    return product
  }
}
