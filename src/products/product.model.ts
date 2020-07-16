import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true, min: 0 })
  price: number

  constructor(name: string, description: string, price: number) {
    super()
    this.name = name
    this.description = description
    this.price = price
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product)
