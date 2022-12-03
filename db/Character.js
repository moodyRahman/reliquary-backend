
import mongoose from 'mongoose';
import Item from "./Item.js"
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    class: String,
    description:   String,
    items:[Item],
    rollers:String,
    id:Number,
});

const Character = mongoose.model('Character', CharacterSchema);

export default Character

