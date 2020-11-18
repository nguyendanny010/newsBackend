const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

/*
 * resolver object is the actual implementation of the GraphQL schema
 * Structure is identical to the typeDefs definition
 */
const resolvers = {
    Query,
    Mutation,
    User,
    Link
}

const prisma = new PrismaClient()

// 3
/*
 * Schema and resolvers are bundled and passed to the GraphQLServer which is
 * imported from graphql-yoga. This tells the server what API operations are
 * accepted and how they should be resolved.
 */
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))