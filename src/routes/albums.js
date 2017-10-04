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
          res.render('album', {album, reviews, user: req.session.user})
        })
      } else {
        res.status(404).render('not_found')
      }
    }
  })
})

albums.post('/:albumID/reviews/delete/:reviewID', (req, res) => {
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
      if(album) {
        res.render('new_review', {album, user: req.session.user})
      } else {
        res.status(404).render('not_found', {user: req.session.user})
      }
    }
  })
})

albums.post('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID
  const newReviewData = req.body
  const {album, author, content} = newReviewData
  db.createReview(newReviewData, (error, createdReview) => {
    if (error) {
      res.status(500).render('error', {error, user: req.session.user})
    } else {
      const newReview = createdReview[0]
      if(newReview) {
        setTimeout(()=> {res.redirect(`/albums/${albumID}`)}, 3000)
      } else {
        res.status(404).render('not_found')
      }
    }
  })
})


module.exports = albums
