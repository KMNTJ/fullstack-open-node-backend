require('dotenv').config()

const PORT = 3003
const BLOGLIST_APP_URI = process.env.NODE_ENV === 'test'
 ? process.env.MONGODB_TEST_BLOGLIST_APP_URI
 : process.env.MONGODB_DEV_BLOGLIST_APP_URI

module.exports = {
    BLOGLIST_APP_URI,
    PORT
}