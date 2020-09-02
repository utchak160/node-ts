import {NextFunction, Request, Response} from "express";

const Todo = require('../models/todo.model');

export const getAllTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();
        if (!todos) {
            return res.status(404).json(
                {
                    errors: [
                        {
                            msg: 'Todo not found'
                        }
                    ]
                }
            );
        }

        res.json({
            todos
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            errors: [
                {msg: 'Server error'}
            ]
        });
    }
}

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { description, completed } = req.body;
    try {
        const todo = new Todo({
            description,
            completed
        });
        await todo.save();
        res.status(201).json({
            todo
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            errors: [
                {msg: 'Server error'}
            ]
        });
    }
}
