import { Router } from 'express';
import cookieParser from 'cookie-parser'
import User from '../models/user.model.js'
import passport from 'passport';


const router = Router();


/* router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new User({ first_name, last_name, email, age, password: createHash(password) });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
}); */


router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "usuario registrado" })
});


router.get('/failregister', async (req, res) => {
    console.log("Estrategia fallida")
    res.send({ error: "failed" })
})

/* router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" })

        const user = await User.findOne({ email }, { email: 1, first_name: 1, last_name: 1, age: 1, password: 1 });
        if (!user) return res.status(400).send({ status: "error", error: "Usuario no encontrado" });
        if (!isValidPassword(user, password)) return res.status(403).send({ status: "error", error: "Password incorrecto" })
        delete user.password
        req.session.user = user
    } catch (error) {
        console.error(error)
    }
    res.redirect('/profile');
}); */

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: "error", error: "credenciales invalidas" })
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.send({ status: "success", payload: req.user })
});

router.get('faillogin', (req, res) => {
    res.send({error: "login fallido"})
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid')
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});
export default router