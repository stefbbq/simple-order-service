import express from 'express'
import { InventoryController } from '../controllers/Inventory.controller'

let router = express.Router()
let inventoryController = new InventoryController()

router.get('/', inventoryController.getInventory)
router.get('/:id', inventoryController.getInventoryItem)
router.post('/', inventoryController.createInventoryItem)
router.put('/:id', inventoryController.updateInventoryItem)
router.delete('/:id', inventoryController.deleteInventoryItem)

export default router
