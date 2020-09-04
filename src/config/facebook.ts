import {Strategy, StrategyOption} from 'passport-facebook'
import passport from "passport";
const User = require('../models/user.model');

export const facebookStrategy: StrategyOption = {
    // @ts-ignore
    clientID: process.env.FACEBOOK_APP_ID,
    // @ts-ignore
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `https://auth-ts.herokuapp.com/api/auth/facebook/callback`,
    // profileFields: ['id', 'displayName', 'email'],
    // enableProof: true,
};


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
                const username = profile.username;

                const checkUser = await User.findOne({email});
                if (checkUser) {
                    const user = await User.findByIdAndUpdate(
                        checkUser._id,
                        {$set: {facebookId: profile.id} },
                        {new: true}
                    );
                    return done(null, user, {statusCode: 200});
                }

                const userData = new User({
                    facebookId: profile.id,
                    username,
                    email
                });

                const user = await userData.save({validateBeforeSave: true});

                return done(null, user, {statusCode: 201});
            } catch (err) {
                return done(err.message);
            }
        }
    )
);

module.exports = passport;
