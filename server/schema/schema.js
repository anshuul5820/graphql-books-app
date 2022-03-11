const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql

//dummy data
// var books = [
//   { name: 'halua', genre: 'food', id: '1', authorId: '1' },
//   { name: 'puri', genre: 'sci-fi', id: '2', authorId: '2' },
//   { name: 'gazar', genre: 'romance', id: '3', authorId: '3' },
//   { name: 'tamatar', genre: 'fantasy', id: '4', authorId: '2' },
//   { name: 'adrak', genre: 'fantasy', id: '5', authorId: '3' },
//   { name: 'elaichi', genre: 'fantasy', id: '6', authorId: '3' },
// ]

// var authors = [
//   { name: 'Joeeeeee Biden', age: 11, id: '1' },
//   { name: 'Vladimir Putin', age: 23, id: '2' },
//   { name: 'Zachinda Arden', age: 44, id: '3' },
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID }, //both nos and strings can be used here
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent) //entire book schema is accessible here
        // return _.find(authors, { id: parent.authorId })
        return Author.findById(parent.authorId)
      },
    },
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
    books: {
      type: new GraphQLList(BookType), //!Booktype bcoz an author has a list of book
      resolve(parent, args) {
        // return _.filter(books, {
        // authorId: parent.id,
        // })
        return Book.find({ authorId: parent.id })
      },
    },
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
        // return _.find(books, {
        // id: args.id,
        // })
        return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // return _.find(authors, {
        // id: args.id,
        // })
        return Author.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find({}) //return all
      },
    }, //GET all books
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        return Author.find({})
      },
    }, //GET all authors
  },
  //book(id:'abc')
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //diff mutations- add author, delete author
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      }, //name & age required to add new user
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        })
        return author.save() //mongoose saves and returns that obj
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        })
        return book.save()
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})

//ex of root query-> fetch all books, fetch all authors, etc

//type relations in graphql
//every author has a list of books
//every book has an author
//mutations- allowing to change data
