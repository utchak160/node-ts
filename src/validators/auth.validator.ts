import {check, ValidationChain} from 'express-validator';

export class AuthValidator {

    static getLoginUserValidator(): ValidationChain[] {
        return [
            check(
                'email',
                'Email is Required'
            ).not().isEmpty(),
            check(
                'email',
                'Enter a valid Email'
            ).isEmail(),
            check(
                'password',
                'Password is required'
            ).not().isEmpty()
        ];
    }

    static getRegisterUserValidator(): ValidationChain[] {
        return [
            ...AuthValidator.getLoginUserValidator(),
            check(
                'username',
                'Username is required'
            ).not().isEmpty()
        ];
    }
}
