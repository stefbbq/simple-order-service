import Inventory from '../models/Inventory.model'

export async function isInventoryUnavailable(names: string[]): Promise<boolean> {
  try {
    let inventory = await Inventory.find()
    return await !!inventory.find(item => {
      return names.find(name => name === item.name && item.quantity === 0)
    })
  } catch (e) {
    console.error(e)
  }
}
