const { blogsRouter } = require('./controllers/blogs')
const { usersRouter } = require('./controllers/users')
const { loginRouter } = require('./controllers/login')
const { auth_mw } = require('./middlewares/auth_mw')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(auth_mw)
app.use('/api/login', loginRouter)
app.use(blogsRouter)
app.use(usersRouter)
app.use(cors())

module.exports = app