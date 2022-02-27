import {Router} from "express";
import {ValidationError} from "../utils/error";
import {TaskRecord} from "../records/task.record";
import {UserRecord} from "../records/user.record";

export const timeRegistrationRouter = Router();


timeRegistrationRouter
    .get('/:id', async (req, res) => {
        const {taskCookie} = await req.cookies;
        const taskCookieParsed = taskCookie ? await JSON.parse(taskCookie) : null;
        const userId = req.params.id;

        if (!(await UserRecord.getOneId(userId))) throw new ValidationError("You've tired to enter without valid User Id. Please go to home page.")

        res.render('time_registration/time-registration.hbs', {
            taskCookieParsed,
            userId,
        })
    })

    .post('/:id', async (req, res) => {
        const userId = req.params.id;
        const {taskCookie} = req.cookies;

        if (taskCookie) {
            const finishedAt = new Date();
            const taskCookieParsed = JSON.parse(taskCookie)
            const startedAt = new Date(taskCookieParsed.startedAt)
            const daysOfEffort = finishedAt.getDate() - startedAt.getDate();
            const minutesOfEffort = Math.floor((finishedAt.getTime() - startedAt.getTime())/1000/60);
            const newTaskRecord = new TaskRecord({...taskCookieParsed, daysOfEffort, minutesOfEffort})
            await newTaskRecord.insert();

            res
                .clearCookie('taskCookie')
                .redirect(`/`)
        } else {
            const taskDesc = await req.body.taskDescription
            if (!taskDesc || taskDesc.length < 3 || taskDesc.length > 25) {
                throw new ValidationError('Task Description has to be 3 to 25 characters long.');
            }
            const currentDate = new Date()
            res
                .cookie('taskCookie', JSON.stringify({
                    startedAt: currentDate,
                    daysOfEffort: 0,
                    minutesOfEffort: 0,
                    taskDescription: taskDesc,
                    userId: userId
                }),{
                    maxAge: 1000*60*60*24*7,
                    httpOnly: true,
                })
                .redirect(`/time-registration/${userId}`)
        }
    })