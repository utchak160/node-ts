import mongoose, {Schema} from 'mongoose';
import {Role} from "../enums/role.enum";

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    role: {
        type: Role
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema);
