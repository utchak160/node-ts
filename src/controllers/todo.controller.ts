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
    const {description, completed} = req.body;
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

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                errors: [{
                    msg: 'Todo not found'
                }]
            });
        }

        res.json({
            todo
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errors: [
                {msg: 'Server error'}
            ]
        });
    }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    try {
        const todo = await Todo.findByIdAndUpdate(todoId,
            {...req.body},
            {new: true, runValidators: true}
            );

        if (!todo) {
            return res.status(404).json({
                errors: [
                    {msg: 'Todo not found'}
                ]
            });
        }
        res.json({
            msg: 'Todo updated successfully'
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errors: [
                {msg: 'Server error'}
            ]
        });
    }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                errors: [{
                    msg: 'Todo not found'
                }]
            });
        }

        await todo.remove();
        res.json({
            msg: 'Todo deleted Successfully'
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errors: [
                {msg: 'Server error'}
            ]
        });
    }
}
