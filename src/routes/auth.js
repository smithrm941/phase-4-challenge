const db = require('../db')
const auth = require('express').Router()

auth.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', {error, user: null})
    } else {
      db.getRecentReviews((error, reviews) => {
        if (error) {
          res.status(500).render('error', {error, user: null})
        } else {
          if(req.session.user) {
            res.render('index', {albums, reviews, user: req.session.user, loggedInId: req.session.user.id})
          } else {
            res.render('index', {albums, reviews, user: null})
          }
        }
      })
    }
  })
})

auth.get('/signup', (req, res) => {
  res.render('signup', {message: '', user: null})
})

auth.post('/signup', (req, res) => {
const userData = req.body
const {name, email, password} = userData
if(!name || !email || !password){
  res.render('signup', {message: 'No fields can be left blank.', user: null})
} else {
    db.checkIfUserExists(userData, (error, newUser) => {
      if(newUser[0]){
        res.render('signup', {message: 'User already exists', user: null})
      } else if(!newUser[0]) {
        db.createUser(userData, (error, newUser) => {
          if (error) {
            res.status(500).render('error', {error})
          } else {
            let user = newUser[0]
            req.session.user = user
            res.redirect(`/users/${user.id}`)
          }
        })
      }
    })
  }
})

auth.get('/signin', (req, res) => {
  res.render('signin', {message: '', user: null})
})

auth.post('/signin', (req, res) => {
const userData = req.body
const {email, password} = userData
db.checkIfUserExists(userData, (error, user) => {
  if(!user[0] || (password!== user[0].password)){
    res.render('signin', {message: 'Incorrect email or password.', user: null})
  } else if(user[0]) {
    db.logInUser(userData, (error, verifiedUser) => {
        if (error) {
          res.status(500).render('error', {error, user: null})
        } else {
          let user = verifiedUser[0]
          req.session.user = user
          res.redirect(`/users/${user.id}`)
        }
      })
    }
  })
})

auth.get('/signout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

module.exports = auth
