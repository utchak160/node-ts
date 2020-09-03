import mongoose, {Schema, SchemaType} from "mongoose";

const todoSchema: Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('todo', todoSchema)


export class Todo extends Schema<Todo> {

}
