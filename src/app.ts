import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {connect as connectDB} from "./config/mongoose";
import {router as AuthRoutes} from "./routes/auth-routes";
import {config} from "./config";
import dotenv from 'dotenv';
import passport from "passport";
import {Strategy} from "passport-facebook";
import {facebookStrategy} from "./config/facebook";

const User = require('./models/user.model')

const app: Application = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

passport.use(
    'facebook',
    new Strategy(
        facebookStrategy,
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({facebookId: profile.id});
                if (existingUser) {
                    return done(null, existingUser, {statusCode: 200, msg: 'User already exist'});
                }
                // @ts-ignore
                const email = profile.emails[0].value;
                const userName = profile.username;

                const checkUser = await User.findOne({email});
                if (checkUser) {
                    const user = await User.findByIdAndUpdate(
                        checkUser._id,
                        {facebookId: profile.id},
                        {new: true}
                    );
                    return done(null, user, {statusCode: 200});
                }

                const userData = new User({
                    facebookId: profile.id,
                    userName,
                    email
                });

                const user = await userData.save({validateBeforeSave: true});

                return done(null, user, {statusCode: 201});
            } catch (err) {
                done(err.message);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user: any) => {
        done(null, user);
    })
});


connectDB();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        "msg": "Working fine"
    });
})

app.use('/api/auth', AuthRoutes)

app.listen(config.port, () => {
    console.log(`App is running on PORT ${PORT}`);
});
