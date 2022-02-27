const {gql} = require("apollo-server")

module.exports = gql`

    scalar Date


    type Task {
        title: String!
        content: String!
        username: String!
        createdAt: Date!
    }

    type User {
        username: String!
        tasks: [Task]!
    }

    input UserInput{
        username: String!
        password: String!
        email: String!
    }

    input TaskInput {
        title: String!
        content:String!
    }

    type NewUser {
        username: String!
        email: String!
        token: String!
    }

    type Query {
        getTasks: [Task]!
        loginUser(username: String!, password: String!): NewUser!
    }

    type Mutation{
        registerUser(input: UserInput!): NewUser!
        addTask(input: TaskInput!): Task!
    }
`