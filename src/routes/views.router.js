import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

//si no esta logueado te envia a /login
router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

//si no esta logueado renderiza register
router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});


//si esta logueado te renderiza el perfil
router.get('/profile', isAuthenticated, (req, res) => {
    
    const { first_name, last_name, email, age, role, cart } = req.session.user
    res.render("profile", { first_name, last_name, email, age, role, cart })
});

export default router;