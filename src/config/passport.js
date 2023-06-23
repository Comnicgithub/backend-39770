import passport from "passport";
import { Strategy } from "passport-local";
import Users from "../models/user.model.js";

export default function () {
    passport.serializeUser(
        (user,done)=> done(null,user._id)
    )
    passport.deserializeUser(
    async(id,done)=> {
        const user = await Users.findById(id)
        return done(null,user)
    }
    )
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback:true,usernameField:'mail' },
            async (req,userName,password,done) => {
                try {
                    let one = await Users.findOne({ mail:userName })
                    if (!one) {
                        let user = await Users.create(req.body)
                        return done(null,user)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error,false)
                }
            }
        )
    )

    passport.use(
        'signin',
        new Strategy(
            { usernameField:'mail' },
            async (userName,password,done) => {
                try {
                    let one = await Users.findOne({ mail:userName })
                    if (one) {
                        return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error,false)
                }
            }
        )
    )
    
    
}