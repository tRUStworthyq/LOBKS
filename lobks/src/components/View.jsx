import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookService from '../services/BookService'

const View = (props) => {
    let navigate = useNavigate()

    const {id} = useParams()

    let [book, setBook] = useState('')

    useEffect(() => {
        BookService.getBookById(id).then((res) =>{
            console.log(res.data)
            setBook(res.data)
        })
    }, [])

    let cancel = () => {
        navigate('/')
    }

  return (
    <div className='container'>
        <div className='row'>
        <h2 className='text-center mt-3'>{book.name}</h2>
        <table className='table table-bordered mt-3'>
            <tbody className='text-center'>
                <tr>
                    <td>Author</td>
                    <td>{book.author}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{book.status}</td>
                </tr> 
            </tbody>
        </table>
        <div className='p-0'>
            <button className='btn btn-danger' onClick={cancel}>Cancel</button>
        </div>
        </div>
    </div>
  )
}

export default View