const ensureLoggedIn = (request, response, next) => {
  if(!request.session.user){
    response.render('signin', {user: null, message: 'Please sign in or sign up for Vinyl'})
  } else {
    next()
  }
}

module.exports = {ensureLoggedIn}
