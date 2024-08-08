import React, { Component, useEffect, useState } from 'react'
import "../styles/UserPanel.css"
import BookService from '../services/BookService'
import { Link, useNavigate } from 'react-router-dom'
import UserBookService from '../services/UserBookService'
import Pagination from '../services/Pagination'
import Sorting from "../services/Sorting";

const UserPanel = () => {

    
    let [search, setSearch] = useState([])
    let [searchData, setSearchData] = useState([])
    let [currentSearchData, setCurrentSearchData] = useState([])
    let [page, setPage] = useState(1)
    let [range, setRange] = useState([])
    let [sortedField, setSortedField] = useState("")
    let [isDesc, setIsDesc] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        BookService.getAllBooks().then((res) => {
            UserBookService.findBooksByUserId(localStorage.getItem("id")).then((res2) => {
                let search = res.data.filter(obj => !res2.data.map(b => b.book.id).includes(obj.id))
                setSearchData(search)
                setSearch(search)
                setRange(Pagination.calculateRange(search.length, 8))
                setCurrentSearchData(Pagination.sliceData(search, page, 8))
            })
        })
    }, [])

    const handlerBtnAdminPanel = () => {
        navigate("/admin-panel-users")
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
    let handlerSort = (e) => {
        if (e.target.name === sortedField && !isDesc) {
            setIsDesc(true)
            setSearch(Sorting.sort(search, e.target.name).reverse())
            setSearchData(Sorting.sort(searchData, e.target.name).reverse())
            setCurrentSearchData(Pagination.sliceData(Sorting.sort(search, e.target.name).reverse(), page, 8))
        } else {
            setIsDesc(false)
            setSortedField(e.target.name)
            setSearch(Sorting.sort(search, e.target.name))
            setSearchData(Sorting.sort(searchData, e.target.name))
            setCurrentSearchData(Pagination.sliceData(Sorting.sort(search, e.target.name), page, 8))
        }
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
                <button className='btn btn-success panel-btn' onClick={handlerBtnAdminPanel}>Admin</button> : <></>
                }
                <button className="btn btn-success panel-btn" onClick={handlerBtnToUserList}>List</button>
                <table className='table table-striped table-bordered table-hover user-main-table'>
                <thead>
                    <tr>
                        <th><a name={"name"} href={"#"} onClick={handlerSort}>Title</a></th>
                        <th><a name={"author"} href={"#"} onClick={handlerSort}>Author</a></th>
                        <th><a name={"description"} href={"#"} onClick={handlerSort}>Description</a></th>
                        <th>Add to list</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSearchData.length !== 0 ? currentSearchData.map(book => 
                            <tr key={book.id}>
                                <td>{book.name}</td>
                                <td><Link to={"/author/" + book.author.id}>{book.author.firstname + " " + book.author.lastname}</Link></td>
                                <td>{book.description}</td>
                                <td className='w-25'>
                                    <button className='btn btn-success user-add-to-list-button' onClick={() => handlerBtnUserAddToList(book.id)}>&#10004;</button>
                                </td>
                            </tr>    
                        ) : <p>Ну ты и чтец...</p>
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