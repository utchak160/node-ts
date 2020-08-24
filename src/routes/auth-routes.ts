import express, {Router} from 'express';
import {AuthValidator} from "../validators/auth.validator";
import {errorHandler} from "../handlers/error.handler";
import {loginUser, registerUser} from "../controllers/auth.controller";

export const router: Router = express.Router();

router.post(
    '/register',
    AuthValidator.getRegisterUserValidator(),
    errorHandler(registerUser)
    );

router.post(
    '/login',
    AuthValidator.getLoginUserValidator(),
    errorHandler(loginUser)
);

