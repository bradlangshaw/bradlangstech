var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
// adding ref's for signup and login
let passport = require('passport');
let User = require('../models/user');
var MongoClient = require('mongodb').MongoClient;
var Mongourl = "mongodb://bradlangs2:Linkbrad1@ds135800.mlab.com:35800/bradlangshawtech";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
        title: 'Brad Langshaw',
       message: 'Brad Langshaw Website',
       pagecss: '../stylesheets/index.css',
      user: req.user });
      
});

router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { 
        title: 'About Me',
       message: 'My name is brad',
       pagecss: '../stylesheets/aboutme.css',
      user: req.user });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { 
        title: 'My Projects',
        user: req.user,
        pagecss: '../stylesheets/projects.css',
   });
});

router.get('/contactme', function(req, res, next) {
  res.render('contactme', { 
        title: 'Contact Me',
        pagecss: '../stylesheets/contactme.css',
      user: req.user});
});

router.post('/contactme', function(req, res, next){
  var jsonObj = JSON.parse(req.body.mail);
  console.log(jsonObj);
  MongoClient.connect(Mongourl,  { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("bradlangshawtech");

    var myobj = {name: jsonObj[0].name, email: jsonObj[0].email, subject: jsonObj[0].subject, message: jsonObj[0].message};
    dbo.collection("emails").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 email inserted");
      db.close();
    });
  });



// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'bradleyman212@gmail.com',
//         pass: 'Linkbrad1'
//     }
// });
// let smtpConfig = {
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // upgrade later with STARTTLS
//     auth: {
//         user: 'bradleyman212@gmail.com',
//         pass: 'Linkbrad1'
//     }
// };

// // create reusable transporter object using the default SMTP transport

// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"'+ req.body.name+'", <info@bradlangshaw.tech>', // sender address
//     to: 'brad.langshaw@live.ca', // list of receivers
//     subject: 'Message From: '+ req.body.name + req.body.email, // Subject line
//     text: 'Subject: ' + req.body.subject + ' Message: ' + req.body.message   // plain text body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
  res.redirect('/thankyou');
});

router.get('/thankyou', function(req, res, next) {
   res.render('thankyou', {
        title: 'Thank You',
        pagecss: "../stylesheets/thankyou.css",
        user: req.user});
});

/* GET register */
// router.get('/register', function(req, res, next) {
//    res.render('register', {
//     title: 'Register',
//     user: req.user});
// });

// router.post('/register', function(req, res) {
//     User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
//         if (err) {
//             return res.redirect('/register');
//             console.log(err.message);
//         }

//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/');
//         });
//     });
// });

router.get('/login', function(req, res, next) {

  // create a variable to store any login messages
    let messages = req.session.messages || [] ;

    // clear the session messages
    req.session.messages = [];

  res.render('login', {
    title: 'Please Login',
      messages: messages,
      user: req.user,
      pagecss: "../stylesheets/login.css"
  });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/articles',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

/* GET /google - show google login prompt */
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

/* GET /google/callback - redirect after google login attempt */
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        scope: 'email'
    }),
    function(req, res) {
        // Successful authentication, redirect to games.
        res.redirect('/articles');
    });


module.exports = router;
