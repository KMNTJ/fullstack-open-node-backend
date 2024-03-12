const { blogsRouter } = require('./controllers/blogs')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(blogsRouter)
app.use(cors())
app.use(express.json())

module.exports = app