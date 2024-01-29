import ListItem from '../models/ListItem'
import mongoose from 'mongoose'
import * as utils from './utils'

export interface IListItem {
  name: string
  qty: number
  _id: mongoose.Types.ObjectId
}

export async function saveListItem(item: string, qty: number): Promise<IListItem> {
  return ListItem.create({
    name: item,
    qty,
  })
}

export async function getListItems(): Promise<IListItem[]> {
  return ListItem.find().lean()
}

export async function findItems(search: string): Promise<IListItem[]> {
  if (utils.isQuoted(search)) {
    const exactMatchRegexp = new RegExp(`^${utils.stripQuotes(search)}$`, 'i')
    return ListItem.find({ name: { $regex: exactMatchRegexp } }).lean()
  }
  const $regex = new RegExp(search, 'i')
  return ListItem.find({ name: { $regex } }).lean()
}

export async function completeItem(item: Pick<IListItem, '_id'>): Promise<void> {
  await ListItem.deleteOne({ _id: item._id })
}