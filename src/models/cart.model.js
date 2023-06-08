import { model,Schema } from 'mongoose'

const collection = 'carts'
const schema = new Schema({
    //id: {type: Number, required: true},
    products: {type:Array, required:true},
})

let Cart = model(collection,schema)
export default Cart