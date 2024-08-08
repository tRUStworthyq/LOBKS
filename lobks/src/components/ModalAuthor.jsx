import React from "react";
import AuthorService from "../services/AuthorService";

const ModalAuthor = ({isShow, onCloseButtonClick, currentAuthor, isUpdate}) => {

    if (!isShow) {
        return null
    }

    let obj = {
        "id": currentAuthor.id,
        "firstname": currentAuthor.firstname,
        "lastname": currentAuthor.lastname
    }

    const handlerInputAuthorFirstname = (e) => {
        obj.firstname = e.target.value
        console.log(obj)
    }
    const handlerInputAuthorLastname = (e) => {
        obj.lastname = e.target.value
        console.log(obj)
    }

    const handlerBtnCreate = () => {
        if (isUpdate) {
            AuthorService.updateAuthor(obj).then((res) => {
                console.log(res.data)
            })
        } else {
            const author = {
                "firstname": obj.firstname,
                "lastname": obj.lastname
            }
            AuthorService.createAuthor(author).then((res) => {
                console.log(res.data)
            })
        }
        onCloseButtonClick()
        window.location.reload()
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div className="searchbar form-group">
                    <input onChange={handlerInputAuthorFirstname} type="text"
                           defaultValue={isUpdate ? currentAuthor.firstname : ""} placeholder={"firstname"}
                           className="form-control" required={true}/>
                    <input onChange={handlerInputAuthorLastname} type="text"
                           defaultValue={isUpdate ? currentAuthor.lastname : ""} placeholder={"lastname"}
                           className="form-control" required={true}/>
                </div>
                <div className="modal-buttons-group">
                    <button className="btn btn-danger modal-btn" onClick={onCloseButtonClick}>Close</button>
                    <button className="btn btn-success modal-btn" onClick={handlerBtnCreate}>{isUpdate ? "Update" : "Create"}</button>
                </div>
            </div>
        </div>
    );
}
export default ModalAuthor;