import ListItem from '../models/ListItem'
import mongoose from 'mongoose'

export interface IListItem {
  name: string
  qty: number
  _id: mongoose.Types.ObjectId
}

export async function saveListItem(item: string, qty: number): Promise<void> {
  await ListItem.create({
    name: item,
    qty,
  })
}

export async function getListItems(): Promise<IListItem[]> {
  return ListItem.find().exec()
}

export async function findItems(search: string): Promise<IListItem[]> {
  const $regex = new RegExp(search, 'i')
  return ListItem.find({ name: { $regex } })
}

export async function completeItem(item: IListItem): Promise<void> {
  await ListItem.deleteOne({ _id: item._id })
}