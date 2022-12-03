import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    hashed_password: String,
    salt:   String,
    characters:{type:mongoose.Schema.Types.ObjectId, ref:"Character"}
});

const User = mongoose.model('User', UserSchema);

export default User
