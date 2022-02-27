const userResolver = require("./userResolver");
const User = require("../Models/User");
const Task = require("../Models/Tasks");


module.exports = {



  User : {
    tasks: async (parentResolver) => {
      return await Task.find({username: parentResolver.username})
    }
    
  },
  Query: {
    ...userResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation
  }
};
