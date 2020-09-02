import express, {Router} from 'express';
import {addTodo, getAllTodo} from "../controllers/todo.controller";
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
