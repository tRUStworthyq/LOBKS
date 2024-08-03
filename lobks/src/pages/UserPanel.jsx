import React, { Component, useEffect, useState } from 'react'
import "../styles/UserPanel.css"
import BookService from '../services/BookService'
import { useNavigate } from 'react-router-dom'
import UserBookService from '../services/UserBookService'
import Pagination from '../services/Pagination'

const UserPanel = () => {

    
    let [search, setSearch] = useState([])
    let [searchData, setSearchData] = useState([])
    let [currentSearchData, setCurrentSearchData] = useState([])
    let [page, setPage] = useState(1)
    let [range, setRange] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        BookService.getAllBooks().then((res) => {
            UserBookService.findBooksByUserId(localStorage.getItem("id")).then((res2) => {
                let search = res.data.filter(book => !res2.data.map(b => b.id).includes(book.id))
                setSearchData(search)
                setSearch(search)
                setRange(Pagination.calculateRange(search.length, 8))
                setCurrentSearchData(Pagination.sliceData(search, page, 8))
            })
        })
    }, [])

    const handlerBtnAdminPanel = () => {
        navigate("/admin-panel")
    }

    function changePage(value) {
        setPage(value)
        setCurrentSearchData(Pagination.sliceData(search, value, 8))
    }

    function handlerBtnUserAddToList(id) {
        const userBook = {
            "user_id": JSON.parse(localStorage.getItem("id")),
            "book_id": id
        }
        UserBookService.saveUserBook(userBook).then((res) => {
            setSearchData(searchData.filter(book => book.id !== res.data.book.id))
            setSearch(search.filter(book => book.id !== res.data.book.id))
            setCurrentSearchData(Pagination.sliceData(search.filter(book => book.id !== res.data.book.id), page, 8))
            setRange(Pagination.calculateRange(search.length - 1, 8))
            console.log(res.data)
        })
    }
    let handlerInputSearch = (e) => {
        let s = searchData.filter(book => book.name.toLowerCase().includes(e.target.value))
        setRange(Pagination.calculateRange(s.length, 8))
        setPage(1)
        setSearch(s)
        setCurrentSearchData(Pagination.sliceData(s, 1, 8))
    }
    let handlerBtnToUserList = () => {
        navigate("/my-list")
    }
  return (
    <div className='user-panel'>
        <h1>Search and add</h1>
        <div className='container'>
            <div className='row'>
                <div className="searchbar form-group">
                    <input className='form-control' type='text' onChange={handlerInputSearch} placeholder='&#128269; Search for your favorite book by title' />
                </div>
                {JSON.parse(localStorage.getItem("roles")).length === 2 ? 
                <button className='btn btn-success panel-btn' onClick={handlerBtnAdminPanel}>Admin Panel</button> : <></>
                }
                <button className="btn btn-success panel-btn" onClick={handlerBtnToUserList}>To list</button>
                <table className='table table-striped table-bordered table-hover user-main-table'>
                <thead>
                    <tr>
                        <th>TItle</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Add to list</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSearchData.map(book => 
                            <tr key={book.id}>
                                <td>{book.name}</td>
                                <td>{book.author.firstname + " " + book.author.lastname}</td>
                                <td>{book.description}</td>
                                <td className='w-25'>
                                    <button className='btn btn-success user-add-to-list-button' onClick={() => handlerBtnUserAddToList(book.id)}>&#10004;</button>
                                </td>
                            </tr>    
                        )
                    }
                </tbody>
            </table>
            {
                        range.map(el => (
                                <button key={el} value={el} className="btn btn-success pagination" onClick={() => changePage(el)}>{el}</button>
                            )
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default UserPanel