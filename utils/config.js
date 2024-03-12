require('dotenv').config()

const PORT = 3003
const BLOGLIST_APP_URI = process.env.MONGODB_BLOGLIST_APP_URI

module.exports = {
    BLOGLIST_APP_URI,
    PORT
}