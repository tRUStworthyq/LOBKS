import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookService from '../services/BookService'

const CreateBook = (props) => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('')

    let changeNameHandler = (e) => {
      setName(e.target.value)
    }
    let changeAuthorHandler = (e) => {
      setAuthor(e.target.value)
    }
    let changeStatusHandler = (e) => {
      setStatus(e.target.value)
    }
    let saveBook = (e) => {
      e.preventDefault()
      let obj = {
        'name': name,
        'author': author,
        'status': status
      }
      BookService.createBook(obj).then((res) => {
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
            <h3 className='text-center'>Add Book</h3>
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
                  <input placeholder='You can add custom status' name='status' className='form-control' value={status} onChange={changeStatusHandler}/>
                </div>
                <button className='btn btn-success mt-3' onClick={saveBook}>Save</button>
                <button className='btn btn-danger mt-3' onClick={cancel} style={{marginLeft: '10px'}}>Cancel</button>
              </form>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default CreateBook