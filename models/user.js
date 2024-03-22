const config = require("../utils/config");
const mongoUrl = config.BLOGLIST_APP_URI;

const mongoose = require("mongoose");
mongoose.connect(mongoUrl);

const userSchema = mongoose.Schema(
  {
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  },
  // { strict: "throw" }
);

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
