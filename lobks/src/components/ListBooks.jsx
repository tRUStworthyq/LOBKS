import React, { useEffect, useState } from 'react'
import BookService from '../services/BookService'
import { useNavigate } from 'react-router-dom'

const ListBooks = (props) => {
  const navigate = useNavigate()

  const [books, setBooks] = useState([])

  useEffect(() => {
    BookService.getBooks().then((res) => {
        setBooks(res.data)
    })
  }, [])

  let editBook = (id) => {
    navigate(`/update_book/${id}`)
  }

  let delBook = (id) => {
    BookService.deleteBook(id).then((res) => {
        setBooks(books.filter((book) => book.id !== id))
    })
  }

  let addBook = () => {
    navigate('/add_book')
  }
  
    return (
    <div>
        <h2 className='text-center'>Books list</h2>
        <div className="container">
        <div className='row w-25 mb-3'>
            <button className='btn btn-primary' onClick={addBook}> Add Book</button>
        </div>
        </div>
        <div className="container">
        <div className='row'>
            <table className='table table-striped table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Book name</th>
                        <th>Book author</th>
                        <th>Book status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => 
                            <tr key={book.id}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.status}</td>
                                <td className='w-25'>
                                    <button className='btn btn-info' onClick={() => editBook(book.id)}>Update</button>
                                    <button className='btn btn-danger ms-3' onClick={() => delBook(book.id)}>Delete</button>
                                </td>
                            </tr>    
                        )
                    }
                </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default ListBooks