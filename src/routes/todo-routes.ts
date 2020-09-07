import express, {Router} from 'express';
import {addTodo, deleteTodo, getAllTodo, getTodoById, updateTodo} from "../controllers/todo.controller";
import {TodoValidator} from "../validators/todo.validator";
import {errorHandler} from "../handlers/error.handler";

export const router: Router = express.Router();

router.get(
    '/',
    getAllTodo
);

router.post(
    '/add',
    TodoValidator.getAddTodoValidator(),
    errorHandler(addTodo)
);

router.get(
    '/:id',
    getTodoById
);

router.put(
    '/:id',
    TodoValidator.getAddTodoValidator(),
    errorHandler(updateTodo)
);

router.delete(
    '/:id',
    deleteTodo
);
