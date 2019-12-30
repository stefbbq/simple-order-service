import mongoose, { Schema } from 'mongoose'
import { IInventory } from '../types/IInventory'

export const inventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
})

export default mongoose.model<IInventory>('inventory', inventorySchema)
