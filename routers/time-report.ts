import {Router} from "express";
import {TaskRecord} from "../records/task.record";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/error";

export const timeReportRouter = Router();

timeReportRouter

    .get('/', async (req, res)=>{
        const {userData} = req.cookies
        const userId = JSON.parse(userData).id

        res.render('time_report/time-report.hbs', {
            userId,
        });
    })

    .get('/all-users', async (req, res)=>{
        const allData = await TaskRecord.listAll();
        console.log(allData);
        res.json(allData);
    })

    .get('/:id', async (req, res)=>{
        const userId = req.params.id
        if (!(await UserRecord.getOneId(userId))) throw new ValidationError("You've tired to enter without valid User Id. Please go to home page.")
        const oneUserData = await TaskRecord.getOneId(userId);
        res.json(oneUserData);

    })