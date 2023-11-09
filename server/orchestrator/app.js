if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { userTypeDefs, userResolvers } = require("./schemas/userSchema")
const { mainTypeDefs, mainResolvers } = require("./schemas/mainSchema")
const PORT = process.env.PORT || 4000

const server = new ApolloServer({
    typeDefs: [mainTypeDefs, userTypeDefs],
    resolvers: [mainResolvers, userResolvers],
    introspection: true
})

startStandaloneServer(server, {
    listen: { port: PORT },
}).then(({ url }) => {
    console.log(`🚀 Orchestrator ready at ${url}`)
})