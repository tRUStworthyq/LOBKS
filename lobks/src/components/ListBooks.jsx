import React, { useEffect, useState } from 'react'
import BookService from '../services/BookService'
import { useNavigate } from 'react-router-dom'
import e from 'cors'

const ListBooks = (props) => {
  const navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  const [tool, setTool] = useState('')

  useEffect(() => {
    BookService.getBooks().then((res) => {
        setBooks(res.data)
        setSearchData(res.data)
    
    })
  }, [])

  let editBook = (id) => {
    navigate(`/update_book/${id}`)
  }

  let delBook = (id) => {
    BookService.deleteBook(id).then((res) => {
        setBooks(books.filter((book) => book.id !== id))
        setSearchData(books.filter((book) => book.id !== id))
    })
  }
  
  const dataSearch = (e) => {
    let value = e.target.value.toLowerCase()
    setSearch(value)

    let filter = searchData.filter((book) => {
        return book.name.toLowerCase().includes(value)
    })
    setSearchData(filter)
}
  
  const dataSort = (field) => {
    const copyData = searchData.concat()
    const sortData = copyData.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1
    })
    setSearchData(sortData)
  }

  let addBook = () => {
    navigate('/add_book')
  }
  let viewBook = (id) => {
    navigate(`/${id}`)
  }

  let setToolBar = (e) => {
    setTool(e.target.value)
    dataSort(e.target.value)
  }

  
    return (
    <div>
        <h2 className='text-center'>Books list</h2>
        <div className="container">
        <div className='row w-25 mb-3'>
            <div className='searchbar form-group'>
                <input value={search} className='form-control' placeholder='Search' onChange={setToolBar}/>
            </div>
            <span>
                <button className='btn btn-primary' onClick={addBook}>Add Book</button>
                <select className='form-select' defaultValue={'name'} onChange={dataSort}>
                    <option value={'name'}>Name</option>
                    <option value={'author'}>Author</option>
                    <option value={'status'}>Status</option>
                </select>
            </span>
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
                        searchData.map(book => 
                            <tr key={book.id}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.status}</td>
                                <td className='w-25'>
                                    <button className='btn btn-info' onClick={() => editBook(book.id)}>Update</button>
                                    <button className='btn btn-danger ms-3' onClick={() => delBook(book.id)}>Delete</button>
                                    <button className='btn btn-success ms-3' onClick={() => viewBook(book.id)}>View</button>
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