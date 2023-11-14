import React, { useEffect, useState } from 'react'
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
        </div>
    </div>
  )
}

export default View