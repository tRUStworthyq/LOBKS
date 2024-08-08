import React, {useState} from 'react';
import "../styles/Modal.css"
import BookService from "../services/BookService";

const ModalBook = ({show, onCloseButtonClick, bookData, isUpdate, authors, currentAuthor}) => {
    if (!show) {
        return null
    }

    let obj = {}
    if (isUpdate) {
        obj = {
            "id": bookData.id,
            "name": bookData.title,
            "description": bookData.description,
            "authorId": currentAuthor.id,
        }
    } else {
        obj = {
            "name": "",
            "description": "",
            "authorId": 1
        }
    }

    const handlerBtnCreate = (e) => {
        if (isUpdate) {
            BookService.updateBook(obj).then((res) => {
                console.log(res.data)
            })
        } else {
            BookService.createBook(obj).then((res) => {
                console.log(res.data)
            })
        }
        onCloseButtonClick()
        window.location.reload()
    }

    const handlerSelectAuthor = (e) => {
        obj.authorId = Number(e.target.value);
        console.log(obj)
    }

    const handlerInputBookDescription = (e) => {
        obj.description = e.target.value
        console.log(obj)
    }
    const handlerInputBookTitle = (e) => {
        obj.name = e.target.value
        console.log(obj)
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div className="searchbar form-group">
                    <input onChange={handlerInputBookTitle} type="text" defaultValue={isUpdate ? bookData.name : ""} placeholder={"title"} className="form-control" required={true}/>
                    <input onChange={handlerInputBookDescription} type="text" defaultValue={isUpdate ? bookData.description : ""} placeholder={"description"} className="form-control" required={true} />
                    <select defaultValue={isUpdate ? bookData.id : ""} onChange={handlerSelectAuthor}>
                        <option value={isUpdate ? currentAuthor.id : authors[0].id}>{isUpdate ? currentAuthor.firstname + " " + currentAuthor.lastname : authors[0].firstname + " " + authors[0].lastname}</option>
                        {authors.map(author => author.id !== currentAuthor.id ?
                            <option key={author.id} value={author.id}>{author.firstname + " " + author.lastname}</option>
                        : null
                        )}
                    </select>
                </div>
                <div className="modal-buttons-group">
                    <button className="btn btn-danger modal-btn" onClick={onCloseButtonClick}>Close</button>
                    <button className="btn btn-success modal-btn" onClick={handlerBtnCreate}>{isUpdate ? "Update" : "Create"}</button>
                </div>
            </div>
        </div>
    );
};

export default ModalBook;