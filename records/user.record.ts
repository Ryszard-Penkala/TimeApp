import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid" ;
import {FieldPacket} from "mysql2";

type UserRecordResults = [UserRecord[], FieldPacket[]];

interface UserRecordInterface {
    id?: string;
    userIp: string;
    userName: string;
}

export class UserRecord implements UserRecordInterface{
    public id?: string;
    public userIp: string
    public userName: string;

    constructor(obj: UserRecordInterface) {
        if (!obj.userName || obj.userName.length < 3 || obj.userName.length > 25) {
            throw new ValidationError('User name has to be 3 to 25 characters long.');
        }

        this.id = obj.id;
        this.userIp = obj.userIp;
        this.userName = obj.userName;

    }

    static async listAll(): Promise<UserRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `users` ORDER BY `userName` ASC") as UserRecordResults;
        return results.map(obj => new UserRecord(obj));
    }

    static async getOneIp(ip: string): Promise<null | UserRecord> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `userIp` = :ip", {
            ip,
        }) as UserRecordResults;
        return results.length === 0 ? null : new UserRecord(results[0]);
    }

    static async getOneId(id: string): Promise<null | UserRecord> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id,
        }) as UserRecordResults;
        return results.length === 0 ? null : new UserRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `users`(`id`,`userIp`,`userName`) VALUES(:id,:userIp,:userName)", {
            id: this.id,
            userIp: this.userIp,
            userName: this.userName,
        });

        return this.id;
    }
}