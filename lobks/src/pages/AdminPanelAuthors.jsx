import React, {useEffect, useState} from 'react';
import ModalBook from "../components/ModalBook";
import ModalAuthor from "../components/ModalAuthor";
import useModal from "../hooks/Modal";
import {Link, useNavigate} from "react-router-dom";
import AuthorService from "../services/AuthorService";
import Pagination from "../services/Pagination";
import Sorting from "../services/Sorting";

const AdminPanelAuthors = () => {

    const navigate = useNavigate()

    const [authors, setAuthors] = useState([])
    const [search, setSearch] = useState([])
    const [currentSearchData, setCurrentSearchData] = useState([])
    const [isDesc, setIsDesc] = useState(true)
    const [currentAuthor, setCurrentAuthor] = useState({})
    const [page, setPage] = useState(1)
    const [range, setRange] = useState([])

    const [isShowingCreateModal, toggleCreateModal] = useModal()
    const [isShowingUpdateModal, toggleUpdateModal] = useModal()

    useEffect(() => {
        AuthorService.getAllAuthors().then((res) => {
            setAuthors(res.data)
            setSearch(res.data)
            setCurrentAuthor(res.data[0])
            setRange(Pagination.calculateRange(res.data.length, 8))
            setCurrentSearchData(Pagination.sliceData(res.data, page, 8))
        })
    }, [])




    const handlerInputSearch = (e) => {
        console.log(localStorage.getItem("roles").replace("[", "")
            .replace("]", "")
            .replace(/"/g, "")
            .split(","))
        const data = authors.filter(author => (author.firstname + " " + author.lastname).includes(e.target.value))
        setSearch(data)
        setPage(1)
        setRange(Pagination.calculateRange(data.length, 8))
        setCurrentSearchData(Pagination.sliceData(data, 1, 8))
    }
    const handlerBtnCancel = () => {
        navigate("/admin-panel-users")
    }
    const handlerBtnToListBooks = () => {
        navigate("/admin-panel-books")
    }

    const handlerSort = (e) => {
        const data = Sorting.sort(search, e.target.name, false, true, !isDesc)
        setAuthors(Sorting.sort(authors, e.target.name, false, true, !isDesc))
        setSearch(data)
        setCurrentSearchData(Pagination.sliceData(data, page, 8))
        setIsDesc(!isDesc)
    }

    const handlerBtnUpdateAuthor = (e) => {
        setCurrentAuthor(authors.find((author) => author.id === Number(e.target.value)))
        toggleUpdateModal()
    }

    const handlerBtnDeleteAuthor = (e) => {
        AuthorService.deleteAuthor(e.target.value).then((res) => {
            console.log(res.data)
            setAuthors(authors.filter(author => author.id !== Number(e.target.value)))
            setSearch(search.filter(author => author.id !== Number(e.target.value)))
            setRange(Pagination.calculateRange(search.length - 1, 8))
            setCurrentSearchData(Pagination.sliceData(search.filter(author => author.id !== Number(e.target.value)), page, 8))
        })
    }

    const changePage = (e) => {
        setPage(e.target.value)
        setCurrentSearchData(Pagination.sliceData(search, e.target.value, 8))
    }



    return (
        <div className="user-panel">
            <h1>Admin Panel</h1>
            <ModalAuthor isShow={isShowingCreateModal} onCloseButtonClick={toggleCreateModal} currentAuthor={currentAuthor} isUpdate={false}/>
            <ModalAuthor isShow={isShowingUpdateModal} onCloseButtonClick={toggleUpdateModal} currentAuthor={currentAuthor} isUpdate={true}/>
            <div className="container">
                <div className="row">
                    <div className="searchbar form-group admin-panel-books">
                        <input type="text" className="form-control"
                               placeholder='&#128269; Search user by username'
                               onChange={handlerInputSearch}/>
                    </div>
                    <button className="btn btn-info panel-btn" onClick={handlerBtnToListBooks}>Books</button>
                    <button className="btn btn-success panel-btn" onClick={toggleCreateModal}>Create</button>
                    <button className="btn btn-danger panel-btn" onClick={handlerBtnCancel}>Cancel</button>

                    <table className='table table-striped table-bordered table-hover user-main-table'>
                        <thead>
                        <tr>
                            <th><a name={"author"} href={"#"} onClick={handlerSort}>Author</a></th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentSearchData.length !== 0 ? currentSearchData.map(author =>
                                <tr key={author.id}>
                                    <td><Link to={"/author/" + author.id}>{author.firstname + " " + author.lastname}</Link></td>
                                    <td className='actions'>
                                        <button value={author.id}
                                                className='btn btn-warning user-add-to-list-button'
                                                onClick={handlerBtnUpdateAuthor}>Update
                                        </button>
                                        <button value={author.id} className='btn btn-danger user-add-to-list-button'
                                                onClick={handlerBtnDeleteAuthor}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ) : <p>Авторов нету(((</p>
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
    );
};

export default AdminPanelAuthors;