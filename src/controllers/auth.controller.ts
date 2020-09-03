import {NextFunction, Request, Response} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {sendWelcomeMail} from "../services/sendgrid.service";
import {config} from "../config";
const User = require('../models/user.model');


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password, role} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                errors: [{msg: 'User already exist'}]
            });
        }
        const user = new User({
            username,
            email,
            password,
            role
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                email: email
            }
        }
        // @ts-ignore
        jwt.sign(payload, config.jwtSecretKey, {expiresIn: '1 year'}, ((err, token) => {
            if (err) {
                return res.status(400).json({errors: [{msg: 'Token not generated'}]});
            }
            res.status(201).send({token});
        }));
        await sendWelcomeMail(username, email);
    } catch (e) {
        res.status(500).json({errors: [{msg: 'Server Error'}]});
        console.log(e);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({errors: [{msg: 'Invalid Credentials'}]});
        }
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(400).json({errors: [{msg: 'Incorrect Password'}]});
        }

        const payload = {
            user: {
                id: user.id,
                email: email
            }
        }
        // @ts-ignore
        jwt.sign(payload, config.jwtSecretKey, {expiresIn: '1 year'}, ((err, token) => {
            if (err) {
                return res.status(400).json({errors: [{msg: 'Token not generated'}]});
            }
            res.status(201).send({token});
        }));
        // const callData = await twilioService.call('123456', '+917565053977');
        // console.log(callData);
    } catch (e) {
        res.status(500).json({errors: [{msg: 'Server Error'}]});
        console.log(e);
    }
}

export const facebookCallback = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.redirect('/', 200);
};

