import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'products';
const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true }
});
schema.plugin(mongoosePaginate);

const Products = mongoose.model(collection, schema);

export default Products;