const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID
  db.getUserByID(userID, (error, users) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const profile = users[0]
      if(profile) {
        db.getAlbumsAndReviewsByUser(profile.id, (error, reviews) => {
          res.render('user_profile', {
            profile,
            reviews,
            user: req.session.user,
            loggedInId: req.session.user.id})
          })
      } else {
        res.status(404).render('not_found')
      }
    }
  })
})

//********DELETING REVIEWS FROM USER PAGE************//
// this would be triggered by button on delete confirmation modal:
//still need to create modal, this works from trash button
users.post('/:userID/review/:reviewID', (req, res) => {
  const userID = req.params.userID
  const reviewID = req.params.reviewID
  db.deleteReview(reviewID, (error, review) => {
    const userID = req.params.userID
    res.redirect(`/users/${userID}`)
  })
})

module.exports = users
