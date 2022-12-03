
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    description: String,
    id: Number,
    public: Boolean
});

const Item = mongoose.model('Item', ItemSchema);

export default Item
