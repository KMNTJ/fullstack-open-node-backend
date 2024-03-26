const { blogsRouter } = require('./controllers/blogs')
const { usersRouter } = require('./controllers/users')
const { loginRouter } = require('./controllers/login')
const { tokenExtractor } = require('./middlewares/tokenExtractor')
const { userExtractor } = require('./middlewares/userExtractor')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(tokenExtractor)
app.use(userExtractor)
app.use('/api/login', loginRouter)
app.use(blogsRouter)
app.use(usersRouter)
app.use(cors())

module.exports = app