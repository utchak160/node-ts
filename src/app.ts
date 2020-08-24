import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {connect as connectDB} from "./config/mongoose";
import { router as AuthRoutes } from "./routes/auth-routes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

connectDB();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        "msg": "Working fine"
    });
})

app.use('/api/auth', AuthRoutes)

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})