const User = require("../Models/User");
const bcrypt = require("bcrypt");
const {
  ApolloError,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const Task = require("../Models/Tasks");
const { authUser } = require("../utils/index");

module.exports = {
  Query: {
    getTasks: async (_, __, { req }) => {
      const user = await authUser(req);
      if (!user) {
        throw new AuthenticationError("Authentication Error !");
      }

      const tasks = Task.find({ username: user.username })
        .sort({ createdAt: -1 });
      return tasks;

    },

    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new UserInputError("Authentication Failed in username !");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new UserInputError("Authentication Failed in password !");
      }
      user.token = user.generateAuth();
      await user.save();
      return user;
    },
  },

  Mutation: {
    registerUser: async (_, { input }) => {
      const ifExists = await User.findOne({ username: input.username });
      if (ifExists) throw new UserInputError("Username is already taken!");
      const user = User(input);
      user.password = await bcrypt.hash(user.password, 8);
      user.token = user.generateAuth();
      await user.save();
      return user;
    },

    addTask: async (_, { input }, { req }) => {
      console.log("In in add task => ", input);

      const checkAuth = await authUser(req);
      if (!checkAuth) {
        throw new ApolloError("Authentication Error !");
      }
      const task = Task({ ...input, username: checkAuth.username });
      await task.save();
      return task;
    },
  },
};
