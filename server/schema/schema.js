const graphql = require('graphql')
const _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
} = graphql

//dummy data
var books = [
  { name: 'halua', genre: 'food', id: '1' },
  { name: 'puri', genre: 'sci-fi', id: '2' },
  { name: 'gazar', genre: 'romance', id: '3' },
]

var authors = [
  { name: 'Joeeeeee Biden', age: 11, id: '1' },
  { name: 'Vladimir Putin', age: 23, id: '2' },
  { name: 'Zachinda Arden', age: 44, id: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID }, //both nos and strings can be used here
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
  //all fields related to 'Book'
  //wrapped in a fn bcoz when multiple types are present, prevents reference functions
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID }, //both nos and strings can be used here
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
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
        id: { type: GraphQLID },
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
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, {
          id: args.id,
        })
      },
    },
  },
  //book(id:'abc')
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})

//ex of root query-> fetch all books, fetch all authors, etc
