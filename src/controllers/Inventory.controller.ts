import { Request, Response } from 'express'
import Inventory from '../models/Inventory.model'
import { IInventory } from '../types/IInventory'

export class InventoryController {
  getInventory = async (req: Request, res: Response): Promise<void> => {
    await Inventory.find((err: any, items: IInventory[]) => {
      if (err) res.send(err)
      else res.send(items)
    })
  }

  getInventoryItem = async (req: Request, res: Response): Promise<void> => {
    await Inventory.findOne({ _id: req.params.id }, (err: any, item: IInventory) => {
      if (err) res.send('Error or inventory item not found')
      else res.send(item)
    })
  }

  createInventoryItem = async (req: Request, res: Response): Promise<void> => {
    const inventory = new Inventory(req.body)
    await inventory.save((err: any) => {
      if (err) res.send(err)
      else res.send([req.body])
    })
  }

  updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
    if (req.body.quantity < 0) {
      res.send('Cannot update inventory item quantity to less than 0')
      return
    }

    await Inventory.findByIdAndUpdate(req.params.id, req.body, (err: any, item: IInventory) => {
      if (err) res.send(err)
      else res.send('Inventory updated')
    })
  }

  updateInventoryQuantity = async (names: string[], inc: number): Promise<void> => {
    await Inventory.updateMany({ name: { $in: names } }, { $inc: { quantity: inc } })
  }

  deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
    if (req.params.id) {
      await Inventory.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) res.send(err)
        else res.send('Inventory item deleted from database')
      })
    }

    if (req.body.name) {
      await Inventory.deleteOne({ name: req.body.name }, (err: any) => {
        if (err) res.send(err)
        else res.send('Inventory item deleted from database')
      })
    }
  }
}
