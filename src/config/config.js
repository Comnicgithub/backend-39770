import { connect } from 'mongoose'
import { config } from 'dotenv'
import { commander } from '../utils/commander'

// console.log(commander.opts())
const { mode } = commander.opts()

config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

export const config = {
    privateKeyJwt: process.env.PRIVATE_KEY_JWT || '',
    PORT: process.env.PORT                     || 3000,
    MONGO_URL: process.env.MONGO_URL           || '',
    connectDB: async () => {
        try {
            await connect('mongodb+srv://lopeznicolas055:Caroso&narizota729@base-de-datos-nico.w4hipvq.mongodb.net/commerce')
            console.log('base de datos conectada..')
        } catch (error) {
            console.log('error de connection')
        }
    }
}