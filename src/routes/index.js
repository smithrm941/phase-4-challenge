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
    const album = albums[0]
    console.log('pressssed the add review button::::::', album)
    res.render('new_review', {album})
  })
  // db.getAlbumsByID(albumID, (error, albums) => {
  //   if (error) {
  //     res.status(500).render('error', {error})
  //   } else {
  //     console.log('just pressed the add review button', albums)
  //     const album = albums[0]
  //     res.render('new_review', {album})
  //   }
  // })
})

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




// router.post('/albums/:albumID/new_review', (req, res) => {
//   const albumID = req.params.albumID
//   const {content} = req.body
//
//   db.getAlbumsByID(albumID, (error, albums) => {
//     if (error) {
//       res.status(500).render('error', {error})
//     } else {
//       const album = albums[0]
//       if(album) {
//         //put query for adding review to database here
//         db.getReviewsByAlbumID(album.id, (error, reviews) => {
//           res.render('album', {album, reviews})
//         })
//       } else {
//         res.status(404).render('not_found')
//       }
//     }
// })

module.exports = router
