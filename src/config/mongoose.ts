import mongoose from 'mongoose';
import {config} from "./index";

export const connect = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('**Connected to DB**');
    } catch (e) {
        console.log('DB connection Failed');
    }
}

