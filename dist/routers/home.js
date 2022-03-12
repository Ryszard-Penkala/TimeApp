var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { UserRecord } from "../records/user.record.js";
export const homeRouter = Router();
homeRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.ip;
    const newUser = yield UserRecord.getOneIp(ip);
    const { userData } = req.cookies;
    if (userData === undefined) {
        res.cookie('userData', JSON.stringify(newUser), {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    }
    res.render('home/home', {
        newUser
    });
}))
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new UserRecord({ userIp: req.ip, userName: String(req.body.userName) });
    yield newUser.insert();
    res
        .cookie('userData', JSON.stringify(newUser), {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    })
        .redirect('/');
}));
//# sourceMappingURL=home.js.map