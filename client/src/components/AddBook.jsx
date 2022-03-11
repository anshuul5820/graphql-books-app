import { gql, useQuery } from '@apollo/client'
import React from 'react'

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery)

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

  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  )
}

export default AddBook
