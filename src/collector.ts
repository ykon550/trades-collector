import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({path: path.join(__dirname, '../.env')});
import { Pool } from "pg";
import fetch from "node-fetch";

// Example of trade data on Binance exchange
// {
//     "id": 103590628,
//     "price": "3818.64000000",
//     "qty": "0.12163900",
//     "time": 1551327280929,
//     "isBuyerMaker": false,
//     "isBestMatch": true
// }

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});

const insertTemplate = 'INSERT INTO binance (id, price, qty, time, isBuyerMaker, isBestMatch) VALUES __REPLACE__ ON CONFLICT DO NOTHING';

// const queryText = 'INSERT INTO trade (id, price, qty, time, isBuyerMaker, isBestMatch) \
// VALUES \
// (4, 1, 1,to_timestamp(1551327280929 / 1000) ,false, true), \
// (8, 1, 1,to_timestamp(1551327280929 / 1000) ,false, true), \
// (9, 1, 1,to_timestamp(1551327280929 / 1000) ,false, true) \
// ON CONFLICT DO NOTHING';

export default async function fetchAndStore() {
    console.log(`start: ${new Date()}`);
    const options = {
        timeout: 10000
    };
    const url = 'https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=1000';
    const res = await fetch(url, options);
    const trades = await res.json();
    const client = await pool.connect();
    try{
        for (let idx = 0; idx < trades.length; idx++) {
            const strVal = `(${trades[idx].id}, ${trades[idx].price}, ${trades[idx].qty}, to_timestamp(${trades[idx].time} / 1000), ${trades[idx].isBuyerMaker}, ${trades[idx].isBestMatch})`;
            const query = insertTemplate.replace('__REPLACE__', strVal)
            const res = await client.query(query);
        }
    } catch(e) {
        console.log(e);
    } finally {
        client.release();
    }
    console.log(`end: ${new Date()}`);
}

