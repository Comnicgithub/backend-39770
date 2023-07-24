import 'dotenv/config.js'
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'
import { __dirname } from './utils.js'
import {engine} from 'express-handlebars'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import inicializePassport from './config/passport.js'
// import {config} from '.config/config.js'


// const app = express()
// config.connectDB()
// const PORT = process.env.PORT || 3000

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// inicializePassport()
// app.use(passport.initialize())

// app.use('/api/session',  sessionRouter.getRouter())
// app.use('/api/users',    usersRouter.getRouter())
// app.use('/api/products', productsRouter)
// app.use('/pruebas',     pruebasRouter)

// app.use((err, req, res, next)=>{
//     console.log(err)
//     res.status(500).send('Todo mal')
// })

// const httpServer = app.listen(PORT,err =>{
//     if (err)  console.log(err)
//     console.log(`Escuchando en el puerto: ${PORT}`)
// })

// // jwt o session 

const server = express()

server.engine('handlebars',engine())
server.set('views',__dirname+'/views')
server.set('view engine','handlebars')

server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 604800*1000
    })
}))





inicializePassport()
server.use(passport.initialize())
server.use(passport.session())
server.use('/public',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
server.use(error_handler)
server.use(not_found_handler)

export default server