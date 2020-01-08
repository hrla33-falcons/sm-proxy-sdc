const express = require('express')
const mongoose = require('mongoose')
const proxy = require('http-proxy-middleware')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(morgan('dev'))
let options = {
  target: 'http://localhost:3000',
  router: {
    'localhost:3000/reviews': 'http://localhost:3003/',
    'localhost:3000/ikea': 'http://localhost:3007/',
    'localhost:3000/products': 'http://localhost:3001/',
    'localhost:3000/searchbar': 'http://localhost:3002/'
  }
}
let ikeaProxy = proxy(options)
app.use(ikeaProxy)
app.listen(port, () => console.log(`listening on port ${port}`))
