var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

var userModel = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');



// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Accueil Page
router.get('/accueil', forwardAuthenticated, (req, res) => res.render('index'));

// inscription Page
router.get('/inscription', forwardAuthenticated, (req, res) => res.render('inscription'));

// Certificat
router.get('/certificat', forwardAuthenticated, (req, res) => res.render('certificat'));

// contact
router.get('/contact', forwardAuthenticated, (req, res) => res.render('contact'));

// horaires
router.get('/horaires', forwardAuthenticated, (req, res) => res.render('horaires'));

// tarifs
router.get('/tarifs', forwardAuthenticated, (req, res) => res.render('tarifs'));

// Boxe
router.get('/boxe', forwardAuthenticated, (req, res) => res.render('boxe'));

// jjb
router.get('/jjb', forwardAuthenticated, (req, res) => res.render('jjb'));

// judo
router.get('/judo', forwardAuthenticated, (req, res) => res.render('judo'));

// lady boxing
router.get('/ladyBoxing', forwardAuthenticated, (req, res) => res.render('ladyBoxing'));

// mma
router.get('/mma', forwardAuthenticated, (req, res) => res.render('mma'));


/* POST sign-up route. */
router.post('/register', function (req, res, next) {
    const { lastNameFromFront, emailFromFront, passwordFromFront, confirmPassword } = req.body;
    let errors = [];

    if (!lastNameFromFront || !emailFromFront || !passwordFromFront || !confirmPassword) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (passwordFromFront != confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (passwordFromFront.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name: lastNameFromFront,
            email: emailFromFront,
            password: passwordFromFront,
            confirmPassword,
        });
    } else {
        userModel.findOne({ emailFromFront }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    lastName: lastNameFromFront,
                    email: emailFromFront,
                    password: passwordFromFront,
                    confirmPassword,
                });
            } else {
                const newUser = new userModel({
                    lastName: req.body.lastNameFromFront,
                    email: req.body.emailFromFront.toLowerCase(),
                    password: req.body.passwordFromFront,
                    date: req.body.date
                });
                // HAsh Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // console.log('HASH ==>', hash);
                        if (err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save
                        newUser
                            .save()
                            .then(user => {
                                console.log('ici c\'est le newUser : ',newUser)
                                req.flash(
                                    'success_msg',
                                    'Bienvenue, maintenant vous pouvez connecter'
                                );
                                res.redirect('/users/accueil');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// IDENTIFICATION LOGIN APRES ETRE DEJA INSCRIT !
// router.post('/login', function(req, res, next) {
//     userModel.findOne({
//             email: req.body.emailFromFront.toLowerCase(),
//             password: req.body.passwordFromFront
//         },
//         function(err, user) {
//             console.log("etape route /users/login : /login")
//             console.log('le user : ',user)
//             if (user) {
//                 req.session.user = user;
//                 res.redirect('/users/register');
//             } else {
//                 console.log("wrong password");
//                 res.redirect('/')
//             }
//         });
// });


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/accueil',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


//   Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

// /* GET logout page. */
// router.get('/logout', function (req, res, next) {
//     req.session.user = null;
//     console.log(req.session.user);
//     res.redirect('/')
// });

module.exports = router;