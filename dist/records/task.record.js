var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../utils/db.js";
import { v4 as uuid } from "uuid";
export class TaskRecord {
    constructor(obj) {
        this.id = obj.id;
        this.startedAt = obj.startedAt;
        this.daysOfEffort = obj.daysOfEffort;
        this.minutesOfEffort = obj.minutesOfEffort;
        this.taskDescription = obj.taskDescription;
        this.userId = obj.userId;
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute("SELECT " +
                "`users`.`userName`, " +
                "`users`.`id`, " +
                "`tasks_time`.`startedAt`, " +
                "`tasks_time`.`daysOfEffort`, " +
                "`tasks_time`.`minutesOfEffort`, " +
                "`tasks_time`.`taskDescription` " +
                "FROM `users` JOIN `tasks_time` ON `users`.`id` = `tasks_time`.`userId` ORDER BY `userName` ASC");
            return results;
        });
    }
    static getOneId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute("SELECT " +
                "`users`.`userName`, " +
                "`users`.`id`, " +
                "`tasks_time`.`startedAt`, " +
                "`tasks_time`.`daysOfEffort`, " +
                "`tasks_time`.`minutesOfEffort`, " +
                "`tasks_time`.`taskDescription` " +
                "FROM `users` JOIN `tasks_time` ON `users`.`id` = `tasks_time`.`userId` WHERE `users`.`id` = :id", {
                id,
            });
            return results;
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = uuid();
            }
            yield pool.execute("INSERT INTO `tasks_time`(`id`,`startedAt`, `daysOfEffort`, `minutesOfEffort`, `taskDescription`, `userId`) VALUES(:id,:startedAt,:daysOfEffort, :minutesOfEffort, :taskDescription, :userId)", {
                id: this.id,
                startedAt: this.startedAt,
                daysOfEffort: this.daysOfEffort,
                minutesOfEffort: this.minutesOfEffort,
                taskDescription: this.taskDescription,
                userId: this.userId,
            });
            return this.id;
        });
    }
}
//# sourceMappingURL=task.record.js.map