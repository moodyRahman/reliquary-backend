import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    hashed_password: String,
    salt:   String,
});

const User = mongoose.model('User', UserSchema);

export default User
