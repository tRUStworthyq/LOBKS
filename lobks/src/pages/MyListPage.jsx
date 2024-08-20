import React, { useEffect, useState } from 'react'
import UserBookService from '../services/UserBookService'
import Pagination from '../services/Pagination'
import { useNavigate } from 'react-router-dom'
import Sorting from "../services/Sorting";

const MyListPage = () => {
    const statusBooks = ["READING", "FAVOURITE", "PLANS", "ABANDONED", "END", "OTHER"]

    let navigate = useNavigate()

    let [search, setSearch] = useState([])
    let [searchData, setSearchData] = useState([])
    let [currentSearchData, setCurrentSearchData] = useState([])
    let [range, setRange] = useState([])
    let [page, setPage] = useState(1)
    let [isDesc, setIsDesc] = useState(false)
    let [sortedField, setSortedField] = useState("")

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
            setSearchData(searchData.filter(obj => obj.book.id !== id))
            setRange(Pagination.calculateRange(search.length - 1, 8))
            setCurrentSearchData(Pagination.sliceData(s, page, 8))
            console.log(search.filter(obj => obj.book.id !== id))
        })
    }

    function changePage(value) {
        setPage(value)
        setCurrentSearchData(Pagination.sliceData(search, value, 8))
    }

    const handlerBtnCancel = () => {
        navigate("/user-panel")
    }

    const handlerSelectStatusBook = (e) => {

        const obj = {
            userBookEmbeddable: {
                userId: JSON.parse(localStorage.getItem("id")),
                bookId: Number(e.target.value.split(",")[1])
            },
            statusBook: e.target.value.split(",")[0]
        }
        UserBookService.changeStatusBookEmbeddableId(obj).then((res) => {
            setSearch(search.map(obj => obj.book.id === Number(e.target.value.split(",")[1])
                ? {book: obj.book, statusBook: e.target.value.split(",")[0]} : obj))
            setSearchData(searchData.map(obj => obj.book.id === Number(e.target.value.split(",")[1])
                ? {book: obj.book, statusBook: e.target.value.split(",")[0]} : obj))
            setCurrentSearchData(currentSearchData.map(obj => obj.book.id === Number(e.target.value.split(",")[1])
                ? {book: obj.book, statusBook: e.target.value.split(",")[0]} : obj))
            console.log(currentSearchData.map(obj => obj.book.id === Number(e.target.value.split(",")[1])
                ? {book: obj.book, statusBook: e.target.value.split(",")[0]} : obj))
        })
    }

    const handlerInputSearch = (e) => {
        let s = searchData.filter(obj => obj.book.name.toLowerCase().includes(e.target.value))
        setRange(Pagination.calculateRange(s.length, 8))
        setPage(1)
        setSearch(s)
        setCurrentSearchData(Pagination.sliceData(s, 1, 8))
    }

    const handlerSort = (e) => {
        if (e.target.name === sortedField && !isDesc) {
            setIsDesc(true)
            setSearch(Sorting.sort(search, e.target.name, true, false).reverse())
            setSearchData(Sorting.sort(searchData, e.target.name, true, false).reverse())
            setCurrentSearchData(Pagination.sliceData(Sorting.sort(search, e.target.name, true, false).reverse(), page, 8))
        } else {
            setIsDesc(false)
            setSortedField(e.target.name)
            setSearch(Sorting.sort(search, e.target.name, true, false))
            setSearchData(Sorting.sort(searchData, e.target.name, true, false))
            setCurrentSearchData(Pagination.sliceData(Sorting.sort(search, e.target.name, true, false), page, 8))
        }
    }


  return (
    <div>
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
                        <th>Remove from list</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSearchData.map(obj => 
                            <tr key={obj.book.id}>
                                <td>{obj.book.name}</td>
                                <td>{obj.book.author.firstname + " " + obj.book.author.lastname}</td>
                                <td>{obj.book.description}</td>
                                <td>
                                    <select defaultValue={[obj.statusBook, obj.book.id]} onChange={handlerSelectStatusBook}>
                                        <option value={[obj.statusBook, obj.book.id]}>{obj.statusBook}</option>
                                        {statusBooks.map(status => status !== obj.statusBook ? <option value={[status, obj.book.id]}>{status}</option> : null)}
                                    </select>
                                </td>
                                <td className='w-25'>
                                    <button className='btn btn-danger user-add-to-list-button' onClick={() => handlerBtnUserRemoveFromList(obj.book.id)}>	&#10006;</button>
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