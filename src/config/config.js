import { connect } from 'mongoose'
import { config } from 'dotenv'
import { commander } from '../utils/commander'
import MongoSingleton from './MongoSingleton.js'
import 'dotenv/config.js'

// console.log(commander.opts())
const { mode } = commander.opts()

config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

export const config = {
    privateKeyJwt: process.env.JWT_SECRET || '',
    PORT: process.env.PORT                     || 3000,
    MONGO_URL: process.env.LINK_MONGO           || '',
    connectDB: async () => MongoSingleton.getInstance()

}

