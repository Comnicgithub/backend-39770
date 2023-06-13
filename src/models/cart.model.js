import { model, Schema, Types } from 'mongoose'

const collection = 'carts'
const schema = new Schema({
    products: [{
        prod: {type: Types.ObjectId},
        units: Number,
        type: Object,
        
        ref: "products"
    }]
})

export default model(collection,schema)