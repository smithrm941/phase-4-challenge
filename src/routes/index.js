const db = require('../db')
const router = require('express').Router()

router.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      res.render('index', {albums})
    }
  })
})

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      if(album) {
        db.getReviewsByAlbumID(album.id, (error, reviews) => {
          res.render('album', {album, reviews})
        })
      } else {
        res.status(404).render('not_found')
      }
    }
  })
})

router.get('/albums/:albumID/new_review', (req, res) => {
  const albumID = req.params.albumID
  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      const {newReviewContent} = req.body
      res.render('new_review', {album})
    }
  })
})

//route to submit the new review:::
//router.post('/albums/:albumID/new_review')
//this includes req.body stuff

//trash button would make a modal pop up and
//this would be triggered by button on delete confirmation modal:
// router.post('/reviews/:reviewID', (req, res) => {
  //db.deleteReview(id, (err) => {
    //res.redirect back to album page...
  //})
// })

router.get('/users/:userID', (req, res) => {
  const userID = req.params.userID
  db.getUserByID(userID, (error, users) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const user = users[0]
      if(user) {
        db.getAlbumsAndReviewsByUser(user.id, (error, reviews) => {
          res.render('user_profile', {
            user,
            reviews})
          })
      } else {
        res.status(404).render('not_found')
      }
    }
  })
})


module.exports = router
