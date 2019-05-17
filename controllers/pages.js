exports.route = function (req, res) {
  res.render('OrderForm')
}

exports.logIn = function (req, res) {
  res.render('logIn')
}

exports.signup = function(req, res) {
  console.log('Yay somebody is trying to signup to our app.')
  res.render('signup')
}

exports.menu = function (req, res) {
  res.render('menu')
}
