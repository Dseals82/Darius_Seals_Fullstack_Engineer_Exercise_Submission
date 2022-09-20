import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'

import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createSchema } from './db'
import express from 'express'
import fetch from 'node-fetch'
import http from 'http'

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # State type
    type State {
        id: String
        key: String
        name: String
        slug: String
    }


    type Query {
        states(name: String): [State]
    }
    
`

const resolvers = {
    Query: {
        states: async (parent: unknown, args: { name?: string }) => {
            const { name } = args
            const response = await fetch(
                'https://datausa.io/api/searchLegacy?dimension=Geography&hierarchy=State&limit=50000'
            )
            const data: any = await response.json()
            if (name) {
                return data.results.filter((state: { name: string }) =>
                    state.name.toLowerCase().startsWith(name.toLowerCase())
                )
            }
            console.log('in ApolloServer', data)
            return data.results
        },
    },
}

async function startServer() {
    const app = express()
    app.use(bodyParser.json())
    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        })
    )
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await createSchema()
    await server.start()
    server.applyMiddleware({ app })
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
    )
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer()
