import {check, ValidationChain} from 'express-validator';

export class TodoValidator {

    static getAddTodoValidator(): ValidationChain[] {
        return [
            check(
                'description',
                'Description is required'
            ).not().isEmpty(),
        ];
    }
}
