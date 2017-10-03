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

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const userData = req.body
  const {name, email, password} = userData
  db.createUser(userData, (error, newUser) => {
    res.redirect('/')
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

//********DELETING REVIEWS FROM ALBUM PAGE************//
// this would be triggered by button on delete confirmation modal:
//still need to create modal, this works from trash button
router.post('/albums/:albumID/reviews/:reviewID', (req, res) => {
  const albumID = req.params.albumID
  const reviewID = req.params.reviewID
  db.deleteReview(reviewID, (error, review) => {
    const albumID = req.params.albumID
    res.redirect(`/albums/${albumID}`)
  })
})

router.get('/albums/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID
  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      res.render('new_review', {album})
    }
  })
})

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

//********DELETING REVIEWS FROM USER PAGE************//
// this would be triggered by button on delete confirmation modal:
//still need to create modal, this works from trash button
router.post('/users/:userID/review/:reviewID', (req, res) => {
  const userID = req.params.userID
  const reviewID = req.params.reviewID
  db.deleteReview(reviewID, (error, review) => {
    const userID = req.params.userID
    res.redirect(`/users/${userID}`)
  })
})


module.exports = router
