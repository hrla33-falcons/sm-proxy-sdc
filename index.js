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
  target: 'http://54.193.48.102:3000',
  router: {
    '54.193.48.102:3000/reviews': 'http://52.53.155.153:3003/',
    '54.193.48.102:3000/ikea': 'http://localhost:3007/',
    '54.193.48.102:3000/products': 'http://localhost:3001/',
    '54.193.48.102:3000/searchbar': 'http://localhost:3002/'
  }
}
let ikeaProxy = proxy(options)
app.use(ikeaProxy)
app.listen(port, () => console.log(`listening on port ${port}`))
