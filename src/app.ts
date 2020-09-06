import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {connect as connectDB} from "./config/mongoose";
import {router as AuthRoutes} from "./routes/auth-routes";
import {router as TodoRoutes} from './routes/todo-routes';
import {config} from "./config";
import dotenv from 'dotenv';
// import passport from "passport";
//
// const User = require('./models/user.model')

const app: Application = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

connectDB();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(passport.initialize());

// require('./config/facebook');
// passport.serializeUser((user, done) => {
//     done(null, user)
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user: any) => {
//         done(null, user);
//     })
// });



app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        "msg": "Working fine"
    });
})

app.use('/api/auth', AuthRoutes);
app.use('/api/todo', TodoRoutes);

app.listen(config.port, () => {
    console.log(`App is running on PORT ${PORT}`);
});
