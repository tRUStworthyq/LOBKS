import React, { useEffect, useState } from 'react'
import UserBookService from '../services/UserBookService'
import Pagination from '../services/Pagination'
import { Link, useNavigate } from 'react-router-dom'
import Sorting from "../services/Sorting";

const MyListPage = () => {
    let navigate = useNavigate()

    let [search, setSearch] = useState([])
    let [searchData, setSearchData] = useState([])
    let [currentSearchData, setCurrentSearchData] = useState([])
    let [range, setRange] = useState([])
    let [page, setPage] = useState(1)
    let [sortedField, setSortedField] = useState("")
    let [isDesc, setIsDesc] = useState(false)
    let statusBooks = ["READING", "FAVOURITE", "PLANS", "ABANDONED", "END", "OTHER"]
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
        UserBookService.deleteUserBook(JSON.parse(localStorage.getItem("id")), id).then((res) => {
            let s = search.filter(obj => obj.book.id !== id)
            setSearch(s)
            console.log(search)
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
    const changeStatusBookHandler = (e) => {
        const bookId = Number(e.target.value.split(",")[0])
        const statusBook = e.target.value.split(",")[1]
        let userBook = {
            "userBookEmbeddable": {
                "userId": JSON.parse(localStorage.getItem("id")),
                "bookId": bookId
            },
            "statusBook": statusBook
        }
        UserBookService.changeStatusBookEmbeddableId(userBook).then((res) => {
            console.log("1", currentSearchData)
            console.log("2", currentSearchData.map(obj => obj.book.id === bookId ? {"book": obj.book, "statusBook": statusBook}: obj))
            setSearch(search.map(obj => obj.book.id === bookId ? {"book": obj.book, "statusBook": statusBook}: obj))
            setSearchData(searchData.map(obj => obj.book.id === bookId ? {"book": obj.book, "statusBook": statusBook}: obj))
            setCurrentSearchData(currentSearchData.map(obj => obj.book.id === bookId ? {"book": obj.book, "statusBook": statusBook}: obj))
        })

    }

    const handlerInputSearch = (e) => {
        let s = searchData.filter(obj => obj.book.name.toLowerCase().includes(e.target.value))
        console.log(s)
        setRange(Pagination.calculateRange(s.length, 8))
        setPage(1)
        setSearch(s)
        setCurrentSearchData(Pagination.sliceData(s, 1, 8))
    }

    const handlerSort = (e) => {
        if (e.target.name === sortedField && !isDesc) {
            setIsDesc(true)
            setSearch(Sorting.sort(search, e.target.name, true).reverse())
            setSearchData(Sorting.sort(searchData, e.target.name, true).reverse())
            setCurrentSearchData(Pagination.sliceData(Sorting.sort(search, e.target.name, true).reverse(), page, 8))
        } else {
            setIsDesc(false)
            setSortedField(e.target.name)
            setSearchData(Sorting.sort(search, e.target.name, true))
            setSearchData(Sorting.sort(searchData, e.target.name, true))
            setCurrentSearchData(Pagination.sliceData(Sorting.sort(search, e.target.name, true), page, 8))
        }
    }



  return (
    <div className='list-panel'>
        <h1>List of your books</h1>
        <div className="container">
            <div className="row">
                <div className="searchbar form-group">
                    <input type="text" className="form-control" placeholder='&#128269; Search for your favorite book by title' onChange={handlerInputSearch}/>
                </div>
                <button className="btn btn-danger panel-btn" onClick={handlerBtnCancel}>Cancel</button>

                <table className='table table-striped table-bordered table-hover user-main-table'>
                <thead>
                    <tr>
                        <th><a name={"name"} href={"#"} onClick={handlerSort}>Title</a></th>
                        <th><a name={"author"} href={"#"} onClick={handlerSort}>Author</a></th>
                        <th><a name={"description"} href={"#"} onClick={handlerSort}>Description</a></th>
                        <th><a name={"statusBook"} href={"#"} onClick={handlerSort}>Status</a></th>
                        <th>Add to list</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSearchData.length !== 0 ? currentSearchData.map(obj => 
                            <tr key={obj.book.id}>
                                <td>{obj.book.name}</td>
                                <td><Link to={"/author/" + obj.book.author.id}>{obj.book.author.firstname + " " + obj.book.author.lastname}</Link></td>
                                <td>{obj.book.description}</td>
                                <td>
                                    <select value={obj.statusBook} onChange={changeStatusBookHandler}>
                                        <option value={[obj.book.id, obj.statusBook]}>{obj.statusBook}</option>
                                        {statusBooks.filter(status => obj.statusBook !== status).map(status =>
                                            <option value={[obj.book.id, status]}>{status}</option>
                                        )}
                                    </select>
                                </td>
                                <td className='w-25'>
                                    <button className='btn btn-danger user-add-to-list-button' onClick={() => handlerBtnUserRemoveFromList(obj.book.id)}>	&#10006;</button>
                                </td>
                            </tr>
                        ) : <p>Чтение полезно!!!</p>
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