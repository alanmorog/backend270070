import { Router } from 'express';
import User from '../models/user.model.js'

import passport from 'passport';


const router = Router();



router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ msg: "usuario registrado" })
});


router.get('/failregister', async (req, res) => {
    console.log("Estrategia fallida")
    res.send({ error: "failed" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: "error", error: "credenciales invalidas" })
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cart: req.user.cart,
    }
    res.redirect("/profile")
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid')
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});
export default router