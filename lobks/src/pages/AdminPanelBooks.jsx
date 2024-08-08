import React, {useEffect, useState} from 'react';
import "../styles/AdminPanel.css"
import useModal from "../hooks/Modal";
import BookService from "../services/BookService";
import Pagination from "../services/Pagination";
import {Link, useNavigate} from "react-router-dom";
import ModalBook from "../components/ModalBook";
import AuthorService from "../services/AuthorService";
import Sorting from "../services/Sorting";

const AdminPanelBooks = () => {

    const navigate = useNavigate()

    const [isShowingCreateModal, toggleCreateModal] = useModal()
    const [isShowingUpdateModal, toggleUpdateModal] = useModal()
    const [books, setBooks] = useState([])
    const [searchBooks, setSearchBooks] = useState([])
    const [currentSearchBooks, setCurrentSearchBooks] = useState([])
    const [page, setPage] = useState(1)
    const [range, setRange] = useState([])
    const [authors, setAuthors] = useState([])
    const [currentAuthor, setCurrentAuthor] = useState({})
    const [currentBook, setCurrentBook] = useState({})
    const [sortedField, setSortedField] = useState("")
    const [isDesc, setIsDesc] = useState(false)

    useEffect(() => {
        BookService.getAllBooks().then((res) => {
            setBooks(res.data)
            setSearchBooks(res.data)
            setRange(Pagination.calculateRange(res.data.length, 8))
            setCurrentSearchBooks(Pagination.sliceData(res.data, page, 8))
            console.log(res.data)
        })
        AuthorService.getAllAuthors().then((res) => {
            setAuthors(res.data)
            setCurrentAuthor(res.data[0])
        })

    }, [])

    const handlerInputSearch = (e) => {
        let data = books.filter(book => book.name.toLowerCase().includes(e.target.value.toLowerCase()))

        setSearchBooks(data)
        setPage(1)
        setCurrentSearchBooks(Pagination.sliceData(data, 1, 8))
    }

    const handlerBtnCancel = (e) => {
        navigate("/admin-panel-users")
    }

    const handlerSort = (e) => {
        let sortedData = Sorting.sort(books, e.target.name, false)
        if (e.target.name === sortedField && !isDesc) {
            setIsDesc(true)
            sortedData = sortedData.reverse()
        } else {
            setIsDesc(false)
        }
        setSortedField(e.target.name)
        setSearchBooks(sortedData)
        setCurrentSearchBooks(Pagination.sliceData(sortedData, page, 8))
    }

    const handlerBtnUpdateBook = (e) => {
        let arr = e.target.value.split(",")
        setCurrentAuthor(authors.filter(author => author.id === Number(arr[1]))[0])
        console.log("value", arr[0])
        setCurrentBook(books.filter(book => book.id === Number(arr[0]))[0])
        console.log(authors.filter(author => author.id === Number(arr[1]))[0])
        toggleUpdateModal()
    }

    const handlerBtnDeleteBook = (e) => {
        BookService.deleteBook(e.target.value).then((res) => {
            setBooks(books.filter(book => book.id !== Number(e.target.value)))
            setSearchBooks(searchBooks.filter(searchBook => searchBook.id !== Number(e.target.value)))
            setRange(Pagination.calculateRange(books.length - 1, 8))
            setCurrentSearchBooks(Pagination.sliceData(searchBooks.filter(searchBook => searchBook.id !== Number(e.target.value)), page, 8))
        })
    }

    const handlerBtnToListAuthors = () => {
        navigate("/admin-panel-authors")
    }

    const changePage = (e) => {
        setPage(e.target.value)
        setCurrentSearchBooks(Pagination.sliceData(searchBooks, e.target.value, 8))
    }

    return (
        <div className="user-panel">
            <h1>Admin Panel</h1>
            <ModalBook show={isShowingCreateModal} onCloseButtonClick={toggleCreateModal} isUpdate={false} currentAuthor={currentAuthor} authors={authors} bookData={currentBook}></ModalBook>
            <ModalBook show={isShowingUpdateModal} onCloseButtonClick={toggleUpdateModal} isUpdate={true} currentAuthor={currentAuthor} authors={authors} bookData={currentBook}></ModalBook>
            <div className="user-panel">
                <div className="container">
                    <div className="row">
                        <div className="searchbar form-group admin-panel-books">
                            <input type="text" className="form-control"
                                   placeholder='&#128269; Search user by username'
                                   onChange={handlerInputSearch}/>
                        </div>
                        <button className="btn btn-info panel-btn" onClick={handlerBtnToListAuthors}>Authors</button>
                        <button className="btn btn-success panel-btn" onClick={toggleCreateModal}>Create</button>
                        <button className="btn btn-danger panel-btn" onClick={handlerBtnCancel}>Cancel</button>

                        <table className='table table-striped table-bordered table-hover user-main-table'>
                            <thead>
                            <tr>
                                <th><a name={"name"} href={"#"} onClick={handlerSort}>Title</a></th>
                                <th><a name={"author"} href={"#"} onClick={handlerSort}>Author</a></th>
                                <th><a name={"description"} href={"#"} onClick={handlerSort}>Description</a></th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentSearchBooks.length !== 0 ? currentSearchBooks.map(book =>
                                    <tr key={book.id}>
                                        <td>{book.name}</td>
                                        <td><Link
                                            to={"/author/" + book.author.id}>{book.author.firstname + " " + book.author.lastname}</Link>
                                        </td>
                                        <td>{book.description}</td>
                                        <td className='actions'>
                                            <button value={[book.id, book.author.id]}
                                                    className='btn btn-warning user-add-to-list-button'
                                                    onClick={handlerBtnUpdateBook}>Update
                                            </button>
                                            <button value={book.id} className='btn btn-danger user-add-to-list-button'
                                                    onClick={handlerBtnDeleteBook}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ) : <p>Книжек нету(((</p>
                            }
                            </tbody>
                        </table>
                        {
                            range.map(el => (
                                    <button key={el} value={el} className="btn btn-success pagination"
                                            onClick={changePage}>{el}</button>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelBooks;