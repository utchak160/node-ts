import passport from "passport";
import {Strategy} from "passport-facebook";
import {facebookStrategy} from "../../config/facebook";

const User = require('../../models/user.model');

// export const facebookConfig = passport.use(
//     'facebook',
//     new Strategy(
//         facebookStrategy,
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const existingUser = await User.findOne({facebookId: profile.id});
//                 if (existingUser) {
//                     return done(null, existingUser, {statusCode: 200, msg: 'User already exist'});
//                 }
//                 // @ts-ignore
//                 const email = profile.emails[0].value;
//                 const userName = profile.username;
//
//                 const checkUser = await User.findOne({email});
//                 if (checkUser) {
//                     const user = await User.findByIdAndUpdate(
//                         checkUser._id,
//                         {facebookId: profile.id},
//                         {new: true}
//                     );
//                     return done(null, user, {statusCode: 200});
//                 }
//
//                 const userData = new User({
//                     facebookId: profile.id,
//                     userName,
//                     email
//                 });
//
//                 const user = await userData.save({validateBeforeSave: true});
//
//                 return done(null, user, {statusCode: 201});
//             } catch (err) {
//                 done(err.message);
//             }
//         }
//     )
// );
//
// passport.serializeUser((user, done) => {
//     done(null, user)
// });
//
// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user: any) => {
//         done(null, user);
//     })
// });
