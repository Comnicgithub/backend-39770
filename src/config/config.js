// import { connect } from 'mongoose'
import dotenv from 'dotenv'
import { commander } from '../utils/commander'
import MongoSingleton from './MongoSingleton.js'
import 'dotenv/config.js'

// console.log(commander.opts())
const { mode } = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})
// console.log(process.env.PERSISTENCE)
exports.config = {
    privateKeyJwt: process.env.JWT_SECRET || '',
    PORT: process.env.PORT                     || 3000,
    MONGO_URL: process.env.LINK_MONGO           || '',
    persistence: process.env.PERSISTENCE,
    connectDB: () => MongoSingleton.getInstance()
    // connectDB: async () => {
    //     try {
    //         await mongoose.connect('mongodb://localhost:27017/c39770')
    //         console.log('base de datos conectada..')
    //     } catch (error) {
    //         console.log('error de connection')
    //     }
    // }
}

