import { useQuery } from '@apollo/client'

import React from 'react'
import { getBookQuery } from '../queries/queries'
import BookList from './BookList'

const BookDetails = ({ bookId }) => {
  if (!bookId) return <p>No id present</p>
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  })
  const handleData = () => {
    if (!loading) {
      const { book } = data
      if (!book) return <p>No books to display</p>
      else
        return (
          <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <ul className='other-books'>
              {book.author.books.map((m) => (
                <li key={m.id}>{m.name}</li>
              ))}
            </ul>
          </div>
        )
    }
  }
  return (
    <div>
      <ul id='book-details'>{handleData()}</ul>
    </div>
  )
}

export default BookDetails
