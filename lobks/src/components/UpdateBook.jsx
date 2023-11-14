import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookService from '../services/BookService'

const UpdateBook = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('')

    const {id} = useParams()

    useEffect(() => {
        BookService.getBookById(id).then((res) => {
            let book = res.data
            setName(book.name)
            setAuthor(book.author)
            setStatus(book.status)
        })
    }, [])

    let changeNameHandler = (e) => {
      setName(e.target.value)
    }
    let changeAuthorHandler = (e) => {
      setAuthor(e.target.value)
    }
    let changeStatusHandler = (e) => {
      setStatus(e.target.value)
    }
    let updateBook = (e) => {
      e.preventDefault()
      let obj = {
        'id': id,
        'name': name,
        'author': author,
        'status': status
      }
      BookService.updateBook(obj).then((res) => {
        navigate('/')
      })
    }
    let cancel = () => {
      navigate('/', {replace: true})
    }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className='card col-md-6 offset-md-3 mt-3'>
            <h3 className='text-center'>Update Book</h3>
            <div className="card-body">
              <form >
                <div className="form-group">
                  <label>
                    Name:
                  </label>
                  <input placeholder='Name' name='name' className='form-control' value={name} onChange={changeNameHandler}/>
                </div>
                <div className="form-group">
                  <label>
                    Author:
                  </label>
                  <input placeholder='Author' name='author' className='form-control' value={author} onChange={changeAuthorHandler}/>
                </div>
                <div className="form-group">
                  <label>
                    Status:
                  </label>
                  <select className="form-select" name='status' value={status} onChange={changeStatusHandler}>
                    <option value={'finished'}>finished</option>
                    <option value={'begane'}>begane</option>
                    <option value={'reading'}>reading</option>
                  </select>
                </div>
                <button className='btn btn-success mt-3' onClick={updateBook}>Save</button>
                <button className='btn btn-danger mt-3 ms-3' onClick={cancel} >Cancel</button>
              </form>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}
export default UpdateBook