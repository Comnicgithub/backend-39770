import { model,Schema } from 'mongoose'

const collection = 'carts'
const schema = new Schema({
    products: {type:Array, required:true},
})

let Cart = model(collection,schema)
export default Cart