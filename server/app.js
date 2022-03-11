const cors = require('cors')
const schema = require('./schema/schema')
const express = require('express')
const mongoose = require('mongoose')
const { MONGOURL } = require('./creds')
const { graphqlHTTP } = require('express-graphql')

const app = express()

app.use(cors())

//connect to db
mongoose.connect(MONGOURL)

mongoose.connection.once('open', () => {
  console.log('Connected to db 💽')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(4000, () => console.log('Listening on port 4000 🚀🚀🚀'))
