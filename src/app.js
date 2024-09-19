import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'
import MongoStore from 'connect-mongo'
import { engine } from 'express-handlebars';
import mongoose from './config/database.js';
import bodyParser from 'body-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import dotenv from "dotenv"




dotenv.config({})



const app = express();

const PORT = 8080

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL })
}));


app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


























/* app.use(session({
    store: new fileStorage({ path: './session', ttl: 100, retries: 0 }),
    secret: 'abc123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }  // 1 minute
})) */


/* // Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})) */

/* app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++
        res.send(`<p>Counter: ${req.session.views}</p>`)
    } else {
        req.session.views = 1
        res.send('Welcome a first time to the session!, update for counter the views')
    }
    console.log("sesion", req.session)
}) */
/* app.get('/setCookie', (req,res)=>{
    res.cookie('coderCookie', 'Soy una cookie', {maxAge: 10000}).send('cookie')
})

app.get('/getCookie', (req,res) => {
    const cookie = req.cookies['coderCookie']
    res.send(`Cookie value: ${cookie}`)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('coderCookie').send('Cookie deleted')
}) */


/* app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Counter: ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send('Welcome')
    }
})


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('connect.sid').send('Borrado')
        }
        else res.send({ status: "ERROR AL INTENTAR SALIR", body: err })
    })
})
 */


/* app.get('/login', (req, res) => {
    const { user, password } = req.query
    if (user !== "coder" || password !== "house") {
        res.send('username and password incorrect')
    } else {
        req.session.user = user
        req.session.admin = true
        res.send('Login successful')
    }
})

function auth(req, res, next) {
    if (req.session?.user === "coder" && req.session?.admin){
        return next()
    }
    res.status(401).send("Is not authorized")
}


app.get('/privado', auth, (req, res) => {
    res.send('Welcome to the protected area')
})
 */


