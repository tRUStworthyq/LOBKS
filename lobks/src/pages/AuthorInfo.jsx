import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthorService from '../services/AuthorService'
import BookService from '../services/BookService'
import "../styles/AuthorInfo.css"
import Pagination from '../services/Pagination'
import UserBookService from '../services/UserBookService'
import Sorting from "../services/Sorting";

const AuthorInfo = () => {

    const navigate = useNavigate()
    
    let [author, setAuthor] = useState({})
    let [books, setBooks] = useState([])
    let [myBooks, setMyBooks] = useState([])
    let [page, setPage] = useState(1)
    let [range, setRange] = useState([])
    let [currentBooks, setCurrentBooks] = useState([])
    let [sortedField, setSortedField] = useState("")
    let [isDesc, setIsDesc] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        AuthorService.getAuthorById(id).then((res) => {
            setAuthor(res.data)
            BookService.getAllBooksByAuthorId(id).then((res2) => {
                setBooks(res2.data)
                setRange(Pagination.calculateRange(res2.data.length, 7))
                setCurrentBooks(Pagination.sliceData(res2.data, page, 7))
            })
            UserBookService.findBooksByUserId(JSON.parse(localStorage.getItem("id"))).then((res3) => {
                setMyBooks(res3.data.map(obj => obj.book))
            })
        })
    },[])


    const changePage = (e) => {
        setPage(e.target.value)
        setCurrentBooks(Pagination.sliceData(books, e.target.value, 7))
    }

    function handlerBtnUserAddToList(id) {
        const userBook = {
            "user_id": JSON.parse(localStorage.getItem("id")),
            "book_id": id
        }
        UserBookService.saveUserBook(userBook).then((res) => {
        let mbks = []
        myBooks.map(obj => mbks.push(obj))
        mbks.push(books.filter(book => book.id === id)[0])
        setMyBooks(mbks)
    })
    }

    function handlerBtnUserRemoveFromList(id) {
        UserBookService.deleteUserBook(JSON.parse(localStorage.getItem("id")), id)
        setMyBooks(myBooks.filter(book => book.id !== id))
    }

    const handlerBtnCancel = () => {
        navigate(-1)
    }
    const handlerSort = (e) => {
        let bks = Sorting.sort(books, e.target.name)
        if (e.target.name === sortedField && !isDesc) {
            setIsDesc(true)
            bks = bks.reverse()
        } else {
            setIsDesc(false)
        }
        setSortedField(e.target.name)
        console.log("bks", bks)
        setBooks(bks)
        setCurrentBooks(Pagination.sliceData(bks, page, 7))

        console.log("aaa", books, currentBooks)
    }

    return (
    <div className='author-panel'>
      <div className="container">
        <div className="row">
            <div className='author-card'>
                <div className="author-card-header">
                    <img
                        src="https://avatars.mds.yandex.net/i?id=cd7c7b9e2da71501bff1b9cb897495b2_l-5394584-images-thumbs&n=13"
                        alt=""/>
                    <p>{author.firstname + " " + author.lastname}</p>
                    <p>Count books: {books.length}</p>
                    <button className="btn btn-danger panel-btn" onClick={handlerBtnCancel}>Cancel</button>
                </div>
            </div>
            <table className='table table-striped table-bordered table-hover user-main-table'>
                <thead>
                    <tr>
                        <th><a name={"name"} href={"#"} onClick={handlerSort}>Title</a></th>
                        <th><a name={"author"} href={"#"} onClick={handlerSort}>Author</a></th>
                        <th><a name={"description"} href={"#"} onClick={handlerSort}>Description</a></th>
                        <th>Add or remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentBooks.length !== 0 ? currentBooks.map(book => 
                            <tr key={book.id}>
                                <td>{book.name}</td>
                                <td><Link to={"/author/" + book.author.id}>{book.author.firstname + " " + book.author.lastname}</Link></td>
                                <td>{book.description}</td>
                                <td>{myBooks.map(b => b.id).includes(book.id) 
                                ? 
                                <button className="btn btn-danger user-add-to-list-button" onClick={() => handlerBtnUserRemoveFromList(book.id)}>	&#10006;</button>
                                : <button className="btn btn-success user-add-to-list-button" onClick={() => handlerBtnUserAddToList(book.id)}>&#10004;</button>}</td>
                                    
                                    
                            </tr>
                            
                    ) : <p>Пока что книг нет</p>
                    }
                        
                </tbody>
            </table>
            {
                        range.map(el => (
                                <button key={el} value={el} className="btn btn-success pagination" onClick={changePage}>{el}</button>
                            )
                        )
                    }
        </div>
      </div>
    </div>
  )
}

export default AuthorInfo
