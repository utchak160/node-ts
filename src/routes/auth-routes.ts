import express, {Router} from 'express';
import {AuthValidator} from "../validators/auth.validator";
import {errorHandler} from "../handlers/error.handler";
import {facebookAuth, facebookCallback, loginUser, registerUser} from "../controllers/auth.controller";
import passport from "passport";

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

router.get(
    '/facebook',
    facebookAuth
);

router.get(
    '/facebook/callback',
    passport.authenticate(
        'facebook',
        {
            failureRedirect: 'http://localhost:4200/login?status=402',
            failureFlash: 'Facebook Auth failed',
            successFlash: 'Facebook Auth success'
        }
    ),
    facebookCallback
);
