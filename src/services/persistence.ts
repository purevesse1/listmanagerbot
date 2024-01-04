import ListItem from '../models/ListItem'

export interface IListItem {
  name: string
  qty: number
}

const ITEMS: IListItem[] = []

export async function saveListItem(item: string, qty: number): Promise<void> {
  await ListItem.create({
    name: item,
    qty,
  })
}

export async function getListItems(): Promise<IListItem[]> {
  return ListItem.find().exec()
}