import { Document } from 'mongoose'

export interface IOrderBase {
  email?: string
  status?: string
  items?: string[]
}
export interface IOrder extends IOrderBase, Document {}
