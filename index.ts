import * as express from 'express';
import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from "method-override";
import {static as eStatic, urlencoded} from "express";
import {engine} from "express-handlebars";
import {handleError} from "./utils/error";
import './utils/db';
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import {homeRouter} from "./routers/home";
import {timeRegistrationRouter} from "./routers/time-registration";
import {timeReportRouter} from "./routers/time-report";


const app = express();
const port = process.env.PORT || 3000 ;

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(eStatic('public'));


app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}))
app.set('view engine', '.hbs');



app.use('/', homeRouter);
app.use('/time-registration', timeRegistrationRouter);
app.use('/time-report', timeReportRouter);

app.use(handleError);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});