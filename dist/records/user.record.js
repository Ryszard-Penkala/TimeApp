var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ValidationError } from "../utils/error.js";
import { pool } from "../utils/db.js";
import { v4 as uuid } from "uuid";
export class UserRecord {
    constructor(obj) {
        if (!obj.userName || obj.userName.length < 3 || obj.userName.length > 25) {
            throw new ValidationError('User name has to be 3 to 25 characters long.');
        }
        this.id = obj.id;
        this.userIp = obj.userIp;
        this.userName = obj.userName;
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute("SELECT * FROM `users` ORDER BY `userName` ASC");
            return results.map(obj => new UserRecord(obj));
        });
    }
    static getOneIp(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute("SELECT * FROM `users` WHERE `userIp` = :ip", {
                ip,
            });
            return results.length === 0 ? null : new UserRecord(results[0]);
        });
    }
    static getOneId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
                id,
            });
            return results.length === 0 ? null : new UserRecord(results[0]);
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = uuid();
            }
            yield pool.execute("INSERT INTO `users`(`id`,`userIp`,`userName`) VALUES(:id,:userIp,:userName)", {
                id: this.id,
                userIp: this.userIp,
                userName: this.userName,
            });
            return this.id;
        });
    }
}
//# sourceMappingURL=user.record.js.map