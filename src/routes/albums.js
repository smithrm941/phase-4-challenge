const db = require('../db')
const albums = require('express').Router()



albums.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      if(album) {
        db.getReviewsByAlbumID(album.id, (error, reviews) => {
          res.render('album', {album, reviews, user: req.session.user, loggedInId: req.session.user.id})
        })
      } else {
        res.status(404).render('not_found')
      }
    }
  })
})

//********DELETING REVIEWS FROM ALBUM PAGE************//
// this would be triggered by button on delete confirmation modal:
//still need to create modal, this works from trash button
albums.post('/:albumID/reviews/:reviewID', (req, res) => {
  const albumID = req.params.albumID
  const reviewID = req.params.reviewID
  db.deleteReview(reviewID, (error, review) => {
    const albumID = req.params.albumID
    res.redirect(`/albums/${albumID}`)
  })
})

albums.get('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID
  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error, user: req.session.user})
    } else {
      const album = albums[0]
      res.render('new_review', {album, user: req.session.user, loggedInId: req.session.user.id})
    }
  })
})

albums.post('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID
  const author = req.session.user.id
  const content = req.body.content
  console.log('new review post route:::::::', albumID)
  // db.createReview(reviewData, (error, review) => {
  //   if (error) {
  //     res.status(500).render('error', {error, user: req.session.user, loggedInId: req.session.user.id})
  //   } else {
  //     req.session.user = user
  //     res.redirect(`/albums/${albumID}`)
  //   }
  // })
})


module.exports = albums
