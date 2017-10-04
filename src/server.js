const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const routes = require('./routes')

const port = process.env.PORT || 3000

const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))

app.use(expressSession({
  secret: 'hamburger phone',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secureProxy: true,
    expires: 600000
    }
}))

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
