'use strict'

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const Sequelize = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize('mangadb', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const app = express()

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
)
