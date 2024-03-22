const { blogsRouter } = require('./controllers/blogs')
const { usersRouter } = require('./controllers/users')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(blogsRouter)
app.use(usersRouter)
app.use(cors())

module.exports = app