import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import Pagination from "../services/Pagination";
import Sorting from "../services/Sorting";

const AdminPanelUsers = () => {

    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState([])
    const [currentUsers, setCurrentUsers] = useState([])
    const [range, setRange] = useState([])
    const [page, setPage] = useState(1)
    const [isDesc, setIsDesc] = useState(false)
    const [sortedField, setSortedField] = useState("")

    useEffect(() => {
        UserService.findAllUsers().then((res) => {
            console.log(res.data)
            setRange(Pagination.calculateRange(res.data.length, 8))
            setUsers(res.data)
            setSearch(res.data)
            setCurrentUsers(Pagination.sliceData(res.data, page, 8))
        })
    }, [])


    const handlerInputSearch = (e) => {
        let data = users.filter(user => user.username.includes(e.target.value))
        setPage(1)
        setRange(Pagination.calculateRange(data.length, 8))
        setSearch(data)
        setCurrentUsers(Pagination.sliceData(data, 1, 8))
    }

    const handlerBtnCancel = (e) => {
        navigate("/user-panel")
    }
    const handlerBtnBanUser = (e) => {
        console.log(e.target.value)
        UserService.updateStatusUserByUsername(e.target.value).then((res) => {
            console.log(search)
            console.log(search.map(user => user.username === e.target.value ? res.data : user))
            setSearch(search.map(user => user.username === e.target.value ? res.data : user))
            setCurrentUsers(currentUsers.map(user => user.username === e.target.value ? res.data : user))
            setUsers(users.map(user => user.username === e.target.value ? res.data : user))
        })
    }
    const handlerSort = (e) => {
        let sortedData = Sorting.sort(users, e.target.name)
        if (e.target.name === sortedField && !isDesc) {
            setIsDesc(true)
            sortedData = sortedData.reverse()
        } else {
            setIsDesc(false)
        }
        setSortedField(e.target.name)
        setSearch(sortedData)
        setCurrentUsers(Pagination.sliceData(sortedData, 1, 8))
    }
    const changePage = (e) => {
        setPage(e.target.value)
        setCurrentUsers(Pagination.sliceData(users, e.target.value, 8))
    }
    const handlerBtnToAdminPanelBooks = () => {
        navigate("/admin-panel-books")
    }
    const handlerBtnToAdminPanelAuthors = () => {
        navigate("/admin-panel-authors")
    }
    return (
        <div className="user-panel">
            <h1>Admin Panel</h1>
            <div className="container">
                <div className="row">
                    <div className="searchbar form-group admin-panel-books">
                        <input type="text" className="form-control"
                               placeholder='&#128269; Search user by username'
                               onChange={handlerInputSearch}/>
                    </div>
                    <button className="btn btn-info panel-btn" onClick={handlerBtnToAdminPanelAuthors}>Authors</button>
                    <button className="btn btn-info panel-btn" onClick={handlerBtnToAdminPanelBooks}>Books</button>
                    <button className="btn btn-danger panel-btn" onClick={handlerBtnCancel}>Cancel</button>

                    <table className='table table-striped table-bordered table-hover user-main-table'>
                        <thead>
                        <tr>
                            <th><a name={"username"} href={"#"} onClick={handlerSort}>Username</a></th>
                            <th><a name={"email"} href={"#"} onClick={handlerSort}>Email</a></th>
                            <th><a name={"statusUser"} href={"#"} onClick={handlerSort}>statusUser</a></th>
                            <th>Change status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentUsers.length !== 0 ? currentUsers.map(user =>
                                <tr key={user.username}>
                                    <td><Link to={"/user/" + user.username}>{user.username}</Link></td>
                                    <td>{user.email}</td>
                                    <td>{user.statusUser}</td>
                                    <td className='w-25'>{user.statusUser !== "BANNED"
                                        ?
                                        <button value={user.username} className="btn btn-danger user-add-to-list-button"
                                                onClick={handlerBtnBanUser}>Ban</button>
                                        : <button value={user.username}
                                                  className="btn btn-success user-add-to-list-button"
                                                  onClick={handlerBtnBanUser}>Unban</button>
                                    }
                                    </td>
                                </tr>
                            ) : <p>Приложение никому не нужно, пичалька((((((</p>
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
    )
}

export default AdminPanelUsers