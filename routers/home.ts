import {Router} from 'express';
import {UserRecord} from "../records/user.record";

export const homeRouter = Router();

homeRouter

    .get('/',async (req, res)=>{
        const ip = req.ip;
        const newUser = await UserRecord.getOneIp(ip);
        const {userData} = req.cookies

        if (userData === undefined){
            res.cookie('userData', JSON.stringify(newUser), {
                maxAge: 1000*60*60*24*7,
                httpOnly: true,
            })
        }
        res.render('home/home', {
            newUser
        })
    })

    .post('/', async (req, res)=> {
        const newUser = new UserRecord({userIp: req.ip, userName: String(req.body.userName) });
        await newUser.insert()

        res
            .cookie('userData', JSON.stringify(newUser), {
                maxAge: 1000*60*60*24*7,
                httpOnly: true,
            })
            .redirect('/');
    })