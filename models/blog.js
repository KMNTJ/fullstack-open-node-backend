const config = require('../utils/config')
const mongoUrl = config.BLOGLIST_APP_URI

const mongoose = require('mongoose')
mongoose.connect(mongoUrl)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = {
    Blog
  }