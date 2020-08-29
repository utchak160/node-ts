import dotenv from 'dotenv';
import {IConfig} from "../interfaces/config";

const environment = dotenv.config();

if (!environment) {
    throw new Error('Env file not found');
}

export const config = {
    port: process.env.PORT || 3000,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    mongoURI: process.env.MONGO_DB_URI
}
