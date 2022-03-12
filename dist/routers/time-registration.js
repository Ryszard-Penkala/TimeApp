var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { ValidationError } from "../utils/error.js";
import { TaskRecord } from "../records/task.record.js";
import { UserRecord } from "../records/user.record.js";
export const timeRegistrationRouter = Router();
timeRegistrationRouter
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskCookie } = yield req.cookies;
    const taskCookieParsed = taskCookie ? yield JSON.parse(taskCookie) : null;
    const userId = req.params.id;
    if (!(yield UserRecord.getOneId(userId)))
        throw new ValidationError("You've tired to enter without valid User Id. Please go to home page.");
    res.render('time_registration/time-registration.hbs', {
        taskCookieParsed,
        userId,
    });
}))
    .post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { taskCookie } = req.cookies;
    if (taskCookie) {
        const finishedAt = new Date();
        const taskCookieParsed = JSON.parse(taskCookie);
        const startedAt = new Date(taskCookieParsed.startedAt);
        const daysOfEffort = finishedAt.getDate() - startedAt.getDate();
        const minutesOfEffort = Math.floor((finishedAt.getTime() - startedAt.getTime()) / 1000 / 60);
        const newTaskRecord = new TaskRecord(Object.assign(Object.assign({}, taskCookieParsed), { daysOfEffort, minutesOfEffort }));
        yield newTaskRecord.insert();
        res
            .clearCookie('taskCookie')
            .redirect(`/`);
    }
    else {
        const taskDesc = yield req.body.taskDescription;
        if (!taskDesc || taskDesc.length < 3 || taskDesc.length > 25) {
            throw new ValidationError('Task Description has to be 3 to 25 characters long.');
        }
        const currentDate = new Date();
        res
            .cookie('taskCookie', JSON.stringify({
            startedAt: currentDate,
            daysOfEffort: 0,
            minutesOfEffort: 0,
            taskDescription: taskDesc,
            userId: userId
        }), {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        })
            .redirect(`/time-registration/${userId}`);
    }
}));
//# sourceMappingURL=time-registration.js.map