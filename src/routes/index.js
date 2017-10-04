const db = require('../db')
const router = require('express').Router()
const middleware = require('./middleware')
const auth = require('./auth')
const albums = require('./albums')
const users = require('./users')
// const reviews = require('./reviews')


router.use('/', auth)
router.use(middleware.ensureLoggedIn)
router.use('/albums', albums)
router.use('/users', users)
// router.use('/reviews', reviews)


module.exports = router
