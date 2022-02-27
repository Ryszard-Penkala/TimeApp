import {pool} from "../utils/db";
import {v4 as uuid} from "uuid" ;
import {FieldPacket} from "mysql2";

type TaskRecordResults = [TaskRecord[], FieldPacket[]];

interface TaskRecordInterface {
    id?: string;
    startedAt: string;
    daysOfEffort: number;
    minutesOfEffort: number;
    taskDescription: string;
    userId: string;
}

export class TaskRecord implements TaskRecordInterface {
    public id?: string;
    public startedAt: string;
    public daysOfEffort: number;
    public minutesOfEffort: number;
    public taskDescription: string;
    public userId: string;

    constructor(obj: TaskRecordInterface) {

        this.id = obj.id;
        this.startedAt = obj.startedAt;
        this.daysOfEffort = obj.daysOfEffort;
        this.minutesOfEffort = obj.minutesOfEffort;
        this.taskDescription = obj.taskDescription;
        this.userId = obj.userId;

    }

    static async listAll(): Promise<TaskRecord[]> {
        const [results] = await pool.execute("SELECT " +
            "`users`.`userName`, " +
            "`users`.`id`, " +
            "`tasks_time`.`startedAt`, " +
            "`tasks_time`.`daysOfEffort`, " +
            "`tasks_time`.`minutesOfEffort`, " +
            "`tasks_time`.`taskDescription` " +
            "FROM `users` JOIN `tasks_time` ON `users`.`id` = `tasks_time`.`userId` ORDER BY `userName` ASC") as TaskRecordResults;
        return results
    }

    static async getOneId(id: string): Promise<null | TaskRecord | any> {
        const [results] = await pool.execute( "SELECT " +
            "`users`.`userName`, " +
            "`users`.`id`, " +
            "`tasks_time`.`startedAt`, " +
            "`tasks_time`.`daysOfEffort`, " +
            "`tasks_time`.`minutesOfEffort`, " +
            "`tasks_time`.`taskDescription` " +
            "FROM `users` JOIN `tasks_time` ON `users`.`id` = `tasks_time`.`userId` WHERE `users`.`id` = :id", {
            id,
        }) as TaskRecordResults;

        return results
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `tasks_time`(`id`,`startedAt`, `daysOfEffort`, `minutesOfEffort`, `taskDescription`, `userId`) VALUES(:id,:startedAt,:daysOfEffort, :minutesOfEffort, :taskDescription, :userId)", {
            id: this.id,
            startedAt: this.startedAt,
            daysOfEffort: this.daysOfEffort,
            minutesOfEffort: this.minutesOfEffort,
            taskDescription: this.taskDescription,
            userId: this.userId,
        });

        return this.id;
    }
}