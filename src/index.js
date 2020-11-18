const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

/*
 * resolver object is the actual implementation of the GraphQL schema
 * Structure is identical to the typeDefs definition
 */
const resolvers = {
    Query:{
            info: () => `This is the API of a Hackernews Clone`,
            // feed resolver accesses the prisma object through the context argument.
            feed: async(parent, args, context) => {
                return context.prisma.link.findMany()
            },
    },
    Mutation:{
        post: (parent, args, context, info) => {
            // Calls the create method on a link from the PrismaClient API
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink
        },
    },
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