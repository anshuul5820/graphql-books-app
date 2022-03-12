import { gql, useQuery } from '@apollo/client'
import { graphql } from 'graphql'

import React, { useState } from 'react'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

const BookList = (props) => {
  const { loading, error, data } = useQuery(getBooksQuery)
  const [selected, setSelected] = useState(null)
  console.log(selected)
  const handleData = () => {
    return loading ? (
      <p>Loading....</p>
    ) : (
      data.books.map((b) => (
        <li onClick={(e) => setSelected(b.id)} key={b.id}>
          {b.name}
        </li>
      ))
    )
  }
  return (
    <div>
      <ul id='book-list'>{handleData()}</ul>
      <BookDetails bookId={selected} />
    </div>
  )
}

export default BookList
