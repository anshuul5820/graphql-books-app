import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from '../queries/queries'

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery)
  const [add, { loading: isLoading }] = useMutation(addBookMutation)

  const [book, setBook] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('')

  const displayAuthors = () => {
    return loading ? (
      <option disabled>Loading authors...</option>
    ) : (
      data.authors.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    add({
      variables: {
        name: book,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
      //refetch books after adding it
    })
  }

  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' onChange={(e) => setBook(e.target.value)} />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  )
}

export default AddBook
