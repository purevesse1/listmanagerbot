import { model, Schema } from 'mongoose'
import { IListItem } from '../services/persistence'

const collection = 'ListItem'
const schema = new Schema<IListItem>({
  name: String,
  qty: Number,
}, { collection })

export default model(collection, schema)
