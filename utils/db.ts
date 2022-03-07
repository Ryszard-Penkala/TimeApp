import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b17375c93249b1',
    password: '212c6ff3',
    database: 'heroku_35de167073df3a9',
    namedPlaceholders: true,
    decimalNumbers: true,
});