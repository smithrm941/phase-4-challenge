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

// //route to submit the new review:::
// albums.post('/albums/:albumID/reviews/new', (req, res) => {
//   const albumID = req.params.albumID
//   // const author = 1
//   const content = req.body.content
//   const newReviewData = {albumID, content}
//   db.createReview(newReviewData, (error, review) => {
//     console.log('the new review::::', review)
//     res.redirect('/')
//   })
// })

module.exports = albums
