import mongoose from 'mongoose';
import {Role} from "../enums/role.enum";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Role
    }
})

module.exports = mongoose.model('user', userSchema);
