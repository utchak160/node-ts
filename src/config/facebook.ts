import {StrategyOption} from 'passport-facebook'

export const facebookStrategy: StrategyOption = {
    // @ts-ignore
    clientID: process.env.FACEBOOK_APP_ID,
    // @ts-ignore
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true,
};
