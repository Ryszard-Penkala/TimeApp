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
import { TaskRecord } from "../records/task.record.js";
import { UserRecord } from "../records/user.record.js";
import { ValidationError } from "../utils/error.js";
export const timeReportRouter = Router();
timeReportRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userData } = req.cookies;
    const userId = JSON.parse(userData).id;
    res.render('time_report/time-report.hbs', {
        userId,
    });
}))
    .get('/all-users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = yield TaskRecord.listAll();
    console.log(allData);
    res.json(allData);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!(yield UserRecord.getOneId(userId)))
        throw new ValidationError("You've tired to enter without valid User Id. Please go to home page.");
    const oneUserData = yield TaskRecord.getOneId(userId);
    res.json(oneUserData);
}));
//# sourceMappingURL=time-report.js.map