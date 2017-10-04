const ensureLoggedIn = (request, response, next) => {
  if(!request.session.user){
    response.redirect('/')
  } else {
    next()
  }
}

module.exports = {ensureLoggedIn}
