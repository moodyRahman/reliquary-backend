
import mongoose from 'mongoose';
import { ItemSchema } from "./Item.js"
import { User } from './User.js';
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    class: String,
    description: String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    items: [ItemSchema],
    rollers: String,
    id: Number,
});

// CharacterSchema.pre("remove", (next) => {
//     const char = this;
//     const users = User.find().populate()
// })

const Character = mongoose.model('Character', CharacterSchema);

export { Character, CharacterSchema }
