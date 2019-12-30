import { suite, test } from 'mocha-typescript'
import { expect } from 'chai'
import { mockRequest, mockResponse } from 'mock-req-res'
import mongoose from 'mongoose'

import Inventory from '../models/Inventory.model'
import { IInventoryBase } from '../types/IInventory'
import { InventoryController } from '../controllers/Inventory.controller'
import { setPromiseTimeout } from '../utils/setPromiseTimeout'

@suite
class InventoryTest {
  private data: IInventoryBase
  private controller: InventoryController

  public static async before() {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      dbName: process.env.MONGO_DBNAME,
      useUnifiedTopology: true
    })
  }

  constructor() {
    this.data = {
      name: 'Test Item',
      description: 'Lorem ipsum dolor sit amet.',
      price: 100,
      quantity: 3
    }
    this.controller = new InventoryController()
  }

  @test('should create a new inventory item')
  public async create() {
    const req = mockRequest({ body: this.data })
    await this.controller.createInventoryItem(req, mockResponse())
    await setPromiseTimeout(500)
    let newItem: IInventoryBase = await Inventory.findOne({ name: this.data.name })
    expect(newItem.description).to.equal(this.data.description)
  }

  @test('should delete the newly created inventory item')
  public async delete() {
    const req = mockRequest({ body: { name: this.data.name } })
    await this.controller.deleteInventoryItem(req, mockResponse())
    await setPromiseTimeout(500)
    let newItem = await Inventory.findOne({ name: req.body.name })
    expect(newItem).to.equal(null)
  }
}
