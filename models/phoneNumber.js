require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_PHONEBOOK_APP_URI

console.log('connecting to', url)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, 'User phone number required'],
  },
})

phoneNumberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema)
