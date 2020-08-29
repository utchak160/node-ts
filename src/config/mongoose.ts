import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://taskapp:@Lucknow160@cluster0-jfyyd.mongodb.net/node-ts?retryWrites=true&w=majority", {
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

