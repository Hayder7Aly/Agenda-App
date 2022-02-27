require("dotenv").config()
const {ApolloServer} = require("apollo-server")
const connectToDB = require("./db/db")
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")
const {GraphQLDateTime} = require("graphql-iso-date")
const {ApolloServerPluginInlineTrace} = require("apollo-server-core")

connectToDB(process.env.MONGO_URI)

const customScalarResolver = {
  Date: GraphQLDateTime
};

const server = new  ApolloServer({
    typeDefs,
    resolvers,
    customScalarResolver,
    context({req}){
        return {req}
    },
    plugins: [ApolloServerPluginInlineTrace()]
})



server.listen(4000, () => console.log("Server is Listening Port : 4000"))
