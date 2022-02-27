const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: String,
  password: String,
  token: String,
});

UserSchema.methods.generateAuth =  function(){
  const user = this
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
  return token
}




const User = mongoose.model("User", UserSchema);

module.exports = User;
