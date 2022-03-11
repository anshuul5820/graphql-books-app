import { gql, useQuery } from '@apollo/client'
import { graphql } from 'graphql'

import React from 'react'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const BookList = (props) => {
  const { loading, error, data } = useQuery(getBooksQuery)
  const handleData = () => {
    return loading ? (
      <p>Loading....</p>
    ) : (
      data.books.map((b) => <li key={b.id}>{b.name}</li>)
    )
  }
  return (
    <div>
      <ul id='book-list'>{handleData()}</ul>
    </div>
  )
}

export default BookList
