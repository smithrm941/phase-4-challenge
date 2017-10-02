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
  _query('SELECT * FROM reviews WHERE album = $1', [albumID], cb)
}

function getReviewsByAuthorID(authorID, cb) {
  _query('SELECT * FROM reviews WHERE author = $1', [authorID], cb)
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
  getReviewsByAuthorID
}
