import React from 'react'
import BookList from './components/BookList'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import AddBook from './components/AddBook'

//apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Ansul's reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}

export default App
