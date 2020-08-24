import {NextFunction, Request, Response} from "express";
import {validationResult} from 'express-validator';

export const errorHandler = (method: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json(errors);
        }
        await method(req, res, next);
    } catch (e) {
        console.log(e);
        next(e.message);
    }
}
