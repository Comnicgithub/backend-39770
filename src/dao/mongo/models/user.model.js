import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'users';
const UserSchema = new mongoose.Schema({
    first_name: { type: String, index: true, required: true },
    last_name: { type: String, required: true },
    photo: { type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" },
    mail: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number , default: "18" },
    role: { type: String, enum: ["user", "admin"], default: "user"}
});

UserSchema.plugin(mongoosePaginate);

const Users = mongoose.model(collection, UserSchema);

export default Users;