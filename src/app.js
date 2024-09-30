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
import jwt from 'jsonwebtoken';
import { generateToken } from './utils.js'




//cargar el env al app
dotenv.config({})



const app = express();

const PORT = 8080

//Middlewares

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexion con mongo
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL })
}));

//routes
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);


//inciar passport
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



app.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        let token = jwt.sign({ email, password, role: "User" }, "claveDeAcceso", { expiresIn: "24h" }) 
        res.send({ message: "Inicio de sesión exitoso", token })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

