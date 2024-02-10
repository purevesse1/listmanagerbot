import ListItem from '../models/ListItem'
import mongoose from 'mongoose'
import * as utils from './utils'
import { DeleteResult } from 'mongodb'

export interface IListItem {
  name: string
  qty: number
  chatId: number
  _id: mongoose.Types.ObjectId
}

export async function saveListItem(item: string, qty: number, chatId: number): Promise<IListItem> {
  return ListItem.create({
    name: item,
    qty,
    chatId,
  })
}

export async function getAllListItems(chatId: number): Promise<IListItem[]> {
  return ListItem.find({ chatId }).lean()
}

export async function findItems(search: string, chatId: number): Promise<IListItem[]> {
  if (utils.isQuoted(search)) {
    const exactMatchRegexp = new RegExp(`^${utils.stripQuotes(search)}$`, 'i')
    return ListItem.find({ name: { $regex: exactMatchRegexp }, chatId }).lean()
  }
  const $regex = new RegExp(search, 'i')
  return ListItem.find({ name: { $regex }, chatId }).lean()
}

export async function completeItem(item: Pick<IListItem, '_id'>): Promise<DeleteResult> {
  return ListItem.deleteOne({ _id: item._id })
}