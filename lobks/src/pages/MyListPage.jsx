import React, { useEffect, useState } from 'react'
import UserBookService from '../services/UserBookService'
import Pagination from '../services/Pagination'
import { useNavigate } from 'react-router-dom'

const MyListPage = () => {
    let navigate = useNavigate()

    let [search, setSearch] = useState([])
    let [searchData, setSearchData] = useState([])
    let [currentSearchData, setCurrentSearchData] = useState([])
    let [range, setRange] = useState([])
    let [page, setPage] = useState(1)
    useEffect(() => {
        UserBookService.findBooksByUserId(JSON.parse(localStorage.getItem("id"))).then((res) => {
            setSearch(res.data)
            setSearchData(res.data)
            setRange(Pagination.calculateRange(res.data.length, 8))
            setCurrentSearchData(Pagination.sliceData(res.data, page, 8))
            console.log(res.data)
        })
    }, [])

    function handlerBtnUserRemoveFromList(id) {
        const userBook = {
            "bookId": id,
            "userId": JSON.parse(localStorage.getItem("id"))
        }
        UserBookService.deleteUserBook(userBook).then((res) => {
            console.log(res.data)
            let s = search.filter(book => book.id !== id)
            setSearch(s)
            setSearchData(searchData.filter(book => book.id !== id))
            setRange(Pagination.calculateRange(search.length - 1, 8))
            setCurrentSearchData(Pagination.sliceData(s, page, 8))
        })
    }

    function changePage(value) {
        setPage(value)
        setCurrentSearchData(Pagination.sliceData(search, value, 8))
    }

    const handlerBtnCancel = () => {
        navigate("/user-panel")
    }


  return (
    <div>
        <h1>List of your books</h1>
        <div className="container">
            <div className="row">
                <div className="searchbar form-group">
                    <input type="text" className="form-control" placeholder='&#128269; Search for your favorite book by title'/>
                </div>
                <button className="btn btn-danger panel-btn" onClick={handlerBtnCancel}>Cancel</button>

                <table className='table table-striped table-bordered table-hover user-main-table'>
                <thead>
                    <tr>
                        <th>TItle</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Add to list</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSearchData.map(obj => 
                            <tr key={obj.book.id}>
                                <td>{obj.book.name}</td>
                                <td>{obj.book.author.firstname + " " + obj.book.author.lastname}</td>
                                <td>{obj.book.description}</td>
                                <td>{obj.statusBook}</td>
                                <td className='w-25'>
                                    <button className='btn btn-danger user-add-to-list-button' onClick={() => handlerBtnUserRemoveFromList(obj.book.id)}>Тут был крестик</button>
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

export default MyListPage