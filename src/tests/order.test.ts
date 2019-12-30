import { suite, test } from 'mocha-typescript'
import { expect } from 'chai'
import { mockRequest, mockResponse } from 'mock-req-res'
import mongoose from 'mongoose'

import Order from '../models/Order.model'
import { IOrderBase } from '../types/IOrder'
import { OrderController } from '../controllers/Order.controller'
import { setPromiseTimeout } from '../utils/setPromiseTimeout'

@suite
class OrderTest {
  private data: IOrderBase
  private controller: OrderController

  public static async before() {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      dbName: process.env.MONGO_DBNAME,
      useUnifiedTopology: true
    })
  }

  constructor() {
    this.data = {
      items: ['Test'],
      email: 'test@email.com'
    }
    this.controller = new OrderController()
  }

  @test('should create a new order')
  public async create() {
    const req = mockRequest({ body: this.data })
    await this.controller.createOrder(req, mockResponse())
    await setPromiseTimeout(500)
    let newItem: IOrderBase = await Order.findOne({ email: this.data.email })
    expect(newItem.items[0]).to.equal(this.data.items[0])
  }

  @test('should delete the newly created order')
  public async delete() {
    const req = mockRequest({ body: { email: this.data.email } })
    await this.controller.deleteOrder(req, mockResponse())
    await setPromiseTimeout(500)
    let newItem = await Order.findOne({ email: req.body.email })
    expect(newItem).to.equal(null)
  }
}
