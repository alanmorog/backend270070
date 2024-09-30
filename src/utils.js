import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from "passport"

// Hashear la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validar la contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)



//jsonWebToken


const PRIVATE_KEY = "claveDeAcceso"

const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, PRIVATE_KEY, { expiresIn: "24h" })
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No estas autenticado" })
    const token = authHeader.split(" ")[1]
    jwt.verify(token, PRIVATE_KEY, (error, credencials) => {
        if (error) return res.status(403).send({ error: "No estas autorizado" })
        req.user = credencials.user
        next()
    })
}


export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user
            next()
        })

            (req, res, next)
    }
}

export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })
        if (req.user.role !== role) return res.status(403).send({ error: "No permission" })
        next()
    }
}



export { generateToken, authToken }