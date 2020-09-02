import express, {Router} from 'express';
import {AuthValidator} from "../validators/auth.validator";
import {errorHandler} from "../handlers/error.handler";
import {facebookCallback, loginUser, registerUser} from "../controllers/auth.controller";
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
    passport.authenticate('facebook', {
        session: false,

    }),
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook',
        {
            failureRedirect: '/login',
            successRedirect: '/',
            failureFlash: 'Authentication Failed',
            successFlash: 'Authentication Success',
        }),
    facebookCallback
);
