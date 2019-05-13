const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/user.js');

exports.signup = function(req, res) {
  res.render('signUp')
}

exports.newUser = function(req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const password2 = req.body.password2

  if (username === '' || email === '' || password === '' || password2 === '') {
    res.send('<h1> Please fill out all the form fields </h1>')
    return
  }

  if (password !== password2) {
    res.send('<h1> Passwords Do Not Match </h1>')
    return
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    var user = new User({ email: email, username: username, password: hash })
    user.save(function(err, savedUser) {
      if (err) {
        console.log('ERROR ERROR')
        console.log(err)
        res.send('<h1> Sorry, something went wrong when creating your user account </h1>')
        return
      }
      console.log('User created successfully.')
      console.log(savedUser)
      res.send('<h1> Thank you for creating an account with us. </h1>')
    })
  });
}
