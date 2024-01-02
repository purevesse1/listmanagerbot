export interface IListItem {
  name: string
  qty: number
}

const ITEMS: IListItem[] = []

export async function saveListItem(item: string, qty: number): Promise<void> {
  ITEMS.push({
    name: item,
    qty,
  })
}

export async function getListItems(): Promise<IListItem[]> {
  return [...ITEMS]
}