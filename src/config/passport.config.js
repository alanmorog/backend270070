import passport from "passport";
import local from 'passport-local'
import userServices from '../models/user.model.js'
import { createHash, isValidPassword } from "../utils.js";


const LocalStrategy = local.Strategy

//estrategia de passport
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
            let user = await userServices.findOne({ email: username })
            if (user) {
                console.log("el usuario exite")
                return done(null, false)
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await userServices.create(newUser)
            return done(null, result)
        } catch (error) {
            return done("error al obtener el usuario")
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userServices.findById(id)
        done(null, user)
    })


    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userServices.findOne({ email: username })
            if (!user) {
                console.log("El usuario no existe")
                return done(null, false)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport