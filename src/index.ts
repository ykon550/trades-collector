import * as cron from "cron"
import fetchAndStore from './collector'

const job = new cron.CronJob('*/10 * * * * *', fetchAndStore, undefined, true, 'America/Los_Angeles');
job.start()
