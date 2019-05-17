const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session")
const DonutModel = require('./models/user.js');
// Config
const port = 3000

// Controllers
var PagesController = require('./controllers/pages.js')
var PostsController = require('./controllers/posts.js')
var UsersController = require('./controllers/users.js')

// Models
var postSchema = require('./models/order.js')
var userSchema = require('./models/user.js')

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({ secret: "cats", cookie: { maxAge: 60000000 }, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Running LocalStrategy')
    User.findOne({ "username": username }, function(err, user) {
      console.log('Inside mongo query callback')
      if(err) {
        console.log(err)
        return done(err);
      }
      console.log('Mongo query successfully executed')
      console.log(user)
      if (user === null) {
        console.log('User not found')
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (result === false) {
          console.log('Incorrect Password')
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('User authenticated successfully')
        return done(null, user);
      })
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/logIn',

  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/logIn',
                                   failureFlash: false })
);

// Static Files Serving
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

mongoose.connect('mongodb://127.0.0.1:27017/index', { useNewUrlParser: true })

// Middle Errors
function isLoggedIn(req, res, next) {
  console.log('User is not logged in yet')
  console.log(req.user)
  if(req.user === undefined) {
    res.redirect('/')
    return
  }

  next();
}

app.get('/', PagesController.route)
app.get('/logIn', PagesController.logIn)
app.get('/signup', PagesController.signup)
app.post('/signup', UsersController.newUser)
app.get('/posts', PostsController.allPosts)
app.post('/new-post', PostsController.newPost)
app.post('/menu'), PagesController.menu

app.get('/upvote-post/:id', PostsController.upvote)
app.get('/downvote-post/:id', PostsController.downvote)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
