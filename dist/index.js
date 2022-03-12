import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import methodOverride from "method-override";
import { static as eStatic } from "express";
import { engine } from "express-handlebars";
import { handleError } from "./utils/error.js";
import './utils/db.js';
import { handlebarsHelpers } from "./utils/handlebars-helpers.js";
import { homeRouter } from "./routers/home.js";
import { timeRegistrationRouter } from "./routers/time-registration.js";
import { timeReportRouter } from "./routers/time-report.js";
const app = express();
const PORT = process.env.PORT || 3000;
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
}));
app.set('view engine', '.hbs');
app.use('/', homeRouter);
app.use('/time-registration', timeRegistrationRouter);
app.use('/time-report', timeReportRouter);
app.use(handleError);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map