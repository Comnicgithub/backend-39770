import 'dotenv/config.js'
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import new_error_handler from './service/errors/index.js'
import not_found_handler from './middlewares/not_found.js'
import { __dirname } from './utils/utils.js'
import { engine } from 'express-handlebars'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import inicializePassport from './config/passport.js'
import { config } from './config/config.js'
import cors from 'cors'
import { addLogger } from './utils/logger.js'

const server = express()

config.connectDB()

server.use(cors())

server.engine('handlebars', engine())
server.set('views', __dirname + '/views')
server.set('view engine', 'handlebars')

server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 604800 * 1000
    })
}))

inicializePassport()

server.use(passport.initialize())
server.use(passport.session())
server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(addLogger)
server.use('/', router)
server.use(new_error_handler)
server.use(error_handler) // Como agregamos un custom error tal vez este tengamos q borrarlo pero por el momento lo deje aca
server.use(not_found_handler)

export default server