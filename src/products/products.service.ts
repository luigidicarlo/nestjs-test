import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  addProduct (name: string, description: string, price: number): Product {
    const newProduct = new Product(
      Math.random().toString(),
      name,
      description,
      price
    )
    this.products.push(newProduct)
    return newProduct
  }

  getProducts (): Product[] {
    return [...this.products]
  }

  getProduct (id: string): Product {
    const foundProduct = this.findProduct(id)[0]
    return { ...foundProduct }
  }

  updateProduct (id: string, name: string, description: string, price: number): Product {
    const [product, index] = this.findProduct(id)
    this.products[index] = { 
      ...product,
      name: name 
        ? name 
        : this.products[index].name,
      description: description 
        ? description 
        : this.products[index].description,
      price: price 
        ? price 
        : this.products[index].price
    }
    return { ...this.products[index] }
  }

  deleteProduct (id: string): Product {
    const index = this.findProduct(id)[1]
    return this.products.splice(index, 1)[0]
  }

  private findProduct (id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id)
    const product = this.products[productIndex]
    if (!product) throw new NotFoundException('Product was not found')
    return [product, productIndex]
  }
}
