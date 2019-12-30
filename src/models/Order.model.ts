import mongoose, { Schema } from 'mongoose'
import { IOrder } from '../types/IOrder'

const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  status: { type: String, required: true },
  items: { type: [String], required: true }
})

export default mongoose.model<IOrder>('order', OrderSchema)
