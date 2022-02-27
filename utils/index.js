const User = require("../Models/User")
const jwt = require("jsonwebtoken")

const authUser =  async (req) => {
    if(!req.header("Authorization")){
        return
    }
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded =   jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({_id: decoded._id , token})
    return user

}   

module.exports = {
    authUser,
}