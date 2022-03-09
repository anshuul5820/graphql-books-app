const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString } = graphql

//dummy data
var books = [
  { name: 'halua', genre: 'food', id: '1' },
  { name: 'puri', genre: 'sci-fi', id: '2' },
  { name: 'gazar', genre: 'romance', id: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
  //all fields related to 'Book'
  //wrapped in a fn bcoz when multiple types are present, prevents reference functions
})

//defines how user can get into graph and start querying
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        //handles what to return for a query
        //parent- helps in mapping relationships
        //args- id passed has access here
        return _.find(books, {
          id: args.id,
        })
      },
    },
  },
  //book(id:'abc')
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
})

//ex of root query-> fetch all books, fetch all authors, etc
