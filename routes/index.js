var express = require('express');
var router = express.Router();
const mailgun = require("mailgun-js");
const userModel=require('../models/User');



const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );


/* Page inscription. */
router.get('/', function(req, res, next) {
  req.session.user = null;
  res.render('register')
});


/* GET  login page. */
router.get('/login', function(req, res, next) {
  req.session.user = null;
  res.render('login')
});

/* GET  register page. */
router.get('/register', function(req, res, next) {
  res.render('index')
});



/* GET Accueil page. (ex home page) */
router.get('/accueil', function(req, res, next) {
  if (!req.session.user) {
      res.redirect('/');
  } else {
      console.log("users HERE")
          // Here, I do not want to get my data from a variable cityList but from my database. Therefore, I need to use find(), which will return my data.
      userModel.find(
          function(err, usersFromDataBase) {
              console.log('Users from DATABASE',usersFromDataBase)
              res.render('index', {
                  user: req.session.user
              });
          });
  }
});



/* GET delete page. */
router.get('/delete-user', function(req, res, next) {
  console.log("User DELETED ID ---> ", req.query.id)
  userModel.deleteOne({ _id: req.query.id },
    function(error) {
      console.log("User supprimé !!")
      userModel.find(
        function(err, userFromDataBase) {
          res.render('index', {
            user: req.session.user
          });
        });
      }
      );
    });
    
    
    // email,subject,text
    router.post('/mail', function(req,res) {
      
      subject = req.body.name;
      mail = req.body.email;
      text = req.body.message;
      
      const api_key = '................';
      const DOMAIN = '...................mailgun.org'
      const mg = mailgun({apiKey: api_key, domain: DOMAIN});
      const data = {
        from: mail,
        to: 'agsdcombat@gmail.com',
        subject: subject,
        text: text
      };
      mg.messages().send(data, function (error, body) {
        console.log('BODY du MAIL ',body);
      });
    });



    
    /* GET horaires page. */
    router.get('/horaires', function(req, res, next) {
      res.render('horaires');
    });
    
    
    /* GET certificat page. */
    router.get('/certificat', function(req, res, next) {
      res.render('certificat');
    });
    
    /* GET Inscription page. */
    router.get('/inscription', function(req, res, next) {
      res.render('inscription');
    });
    
    /* GET contact page. */
    router.get('/contact', function(req, res, next) {
      res.render('contact');
    });
    
    
    /* GET mma page. */
    router.get('/mma', function(req, res, next) {
      res.render('mma');
    });

      /* GET LadyBoxing page. */
      router.get('/ladyBoxing', function(req, res, next) {
        res.render('ladyBoxing');
      });

        /* GET Judo page. */
        router.get('/judo', function(req, res, next) {
          res.render('judo');
        });

            /* GET JJB page. */
            router.get('/jjb', function(req, res, next) {
              res.render('jjb');
            });
      
    
    /* GET tarifs page. */
    router.get('/tarifs', function(req, res, next) {
      res.render('tarifs');
    });

    module.exports = router;