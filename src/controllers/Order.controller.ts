import { Request, Response } from 'express'
import Order from '../models/Order.model'
import { IOrder } from '../types/IOrder'
import { InventoryController } from './Inventory.controller'
import { isInventoryUnavailable } from '../utils/isInventoryUnavailable'
import { enforceArray } from '../utils/enforceArray'

export class OrderController {
  inventoryController: InventoryController = new InventoryController()

  getOrders = async (req: Request, res: Response): Promise<void> => {
    await Order.find((err: any, items: IOrder[]) => {
      if (err) res.send(err)
      else res.send(items)
    })
  }

  getOrder = async (req: Request, res: Response): Promise<void> => {
    await Order.findOne({ _id: req.params.id }, (err: any, item: IOrder) => {
      if (err) res.send('Error or order not found')
      else res.send(item)
    })
  }

  createOrder = async (req: Request, res: Response): Promise<void> => {
    if (await isInventoryUnavailable(enforceArray(req.body.items))) {
      res.send(`Unable to create order: insufficient inventory`)
      return
    }

    try {
      await this.inventoryController.updateInventoryQuantity(req.body.items, -1)
    } catch (e) {
      console.error(e)
      res.send('Error')
    }

    const order = new Order({ ...req.body, status: 'submitted' })
    await order.save((err: any) => {
      if (err) res.send(err)
      else res.send(order)
    })
  }

  updateOrder = async (req: Request, res: Response): Promise<void> => {
    if (req.body.items) {
      if (await isInventoryUnavailable(enforceArray(req.body.items))) {
        res.send(`Unable to create order: insufficient inventory`)
        return
      }
    }

    try {
      let originalOrder: IOrder = await Order.findById(req.params.id)
      await this.inventoryController.updateInventoryQuantity(originalOrder.items, 1)
      await this.inventoryController.updateInventoryQuantity(req.body.items, -1)
    } catch (e) {
      console.error(e)
      res.send('Error')
    }

    await Order.findByIdAndUpdate(req.params.id, req.body, (err: any, item: IOrder) => {
      if (err) res.send(err)
      else res.send('Order updated')
    })
  }

  deleteOrder = async (req: Request, res: Response): Promise<void> => {
    if (req.params.id) {
      await Order.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) res.send(err)
        else res.send('Order deleted from database')
      })
    }

    if (req.body.email) {
      await Order.deleteOne({ email: req.body.email }, (err: any) => {
        if (err) res.send(err)
        else res.send('Order deleted from database')
      })
    }
  }
}
