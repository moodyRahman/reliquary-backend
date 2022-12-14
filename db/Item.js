
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    description: String,
    tags:[String],
    id: Number,
    public: Boolean
});

const Item = mongoose.model('Item', ItemSchema);

export { Item, ItemSchema }
