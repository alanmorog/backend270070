import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});

router.get('/profile', isAuthenticated, (req, res) => {
    
    const { first_name, last_name, email, age } = req.session.user
    res.render("profile", { first_name, last_name, email, age })
});

export default router;