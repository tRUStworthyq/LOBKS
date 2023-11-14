import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
import { useParams } from 'react-router-dom'
import BookService from '../services/BookService'

const View = () => {
    const {id} = useParams()
    let [book, setBook] = useState()
    useEffect(() => {
        BookService.getBookById(id).then((res) => {
            setBook(res.data)
            console.log(res.data)
        })
    }, [])
    return (
    
    <div className='container'>
        <h1 className='text-center'>{book.name}</h1>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 mt-3'></div>
=======
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
>>>>>>> 316323dd901840d68ed6c870c88f5c1c8f5e0e9e
        </div>
    </div>
  )
}

export default View