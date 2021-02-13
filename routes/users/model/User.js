// mongoose is an object modeling template for node.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

// export out this new "user" model using our userSchema function
module.exports = mongoose.model("user", userSchema);
