const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

function getAlbums(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

function getUsers(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getUserByID(userID, cb) {
  _query('SELECT * FROM users WHERE id = $1', [userID], cb)
}

function getReviews(cb) {
  _query('SELECT * FROM reviews WHERE id = $1', [], cb)
}

function getReviewsByAlbumID(albumID, cb) {
  _query(`SELECT
            reviews.*, users.name AS review_author
          FROM
            reviews, users
          WHERE
            reviews.album = $1
          AND
            reviews.author = users.id;
          `, [albumID], cb)
}

function getAlbumsAndReviewsByUser(authorID, cb) {
  _query(`SELECT
            users.id AS author,
            reviews.id AS review_id,
            reviews.review_date,
            reviews.content,
            albums.id AS album_id,
            albums.title AS album_title,
            albums.artist
          FROM
            reviews, albums, users
          WHERE
            users.id = $1
          AND
            users.id = reviews.author
          AND
            reviews.album = albums.id;`, [authorID], cb)
}

// function createReview([albumID, author, content], cb) {
//   _query(`INSERT INTO  reviews(albumID, author, content) VALUES($1, $2, $3) RETURNING *;`, [albumID, author, content], cb)
// }

function deleteReview(reviewID, cb) {
  _query('DELETE FROM reviews WHERE id = $1 RETURNING *', [reviewID], cb)
}

function createUser(userData, cb) {
  _query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *;', [userData.name, userData.email, userData.password], cb)
}

function _query(sql, variables, cb) {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, (error, result) => {
    if (error) {
      console.log('QUERY -> !!ERROR!!')
      console.error(error)
      cb(error)
    } else {
      console.log('QUERY ->', JSON.stringify(result.rows))
      cb(error, result.rows)
    }
  })
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  getUsers,
  getUserByID,
  getReviews,
  getReviewsByAlbumID,
  getAlbumsAndReviewsByUser,
  // createReview,
  deleteReview,
  createUser
}
