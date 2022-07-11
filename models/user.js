const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
}, {timestamps:true});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id, username: this.username, isAdmin: this.isAdmin}, process.env.JWT_PRIVATEKEY);
    return token;
}

const User = mongoose.model('User', userSchema );


module.exports.User = User;
// module.exports.generateAuthToken = generateAuthToken;
