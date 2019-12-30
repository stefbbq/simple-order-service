import { Document } from 'mongoose'

export interface IInventoryBase {
  name?: string
  description?: string
  price?: number
  quantity?: number
}
export interface IInventory extends IInventoryBase, Document {}
