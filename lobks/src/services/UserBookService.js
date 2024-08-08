import axios from "axios"

const USER_BOOKS_API_BASE_URL = "http://localhost:8082/api/user_books/"

const headers = {
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
}


class UserBookService {

    findBooksByUserId(id) {
        return axios.get(USER_BOOKS_API_BASE_URL + "books/" + id, {headers: headers})
    }

    saveUserBook(userBook) {
        return axios.post(USER_BOOKS_API_BASE_URL + "save", userBook, {headers: headers})
    }
    deleteUserBook(uid, id) {
        return axios.delete(USER_BOOKS_API_BASE_URL + uid + "/" + id, {headers: headers})
    }
    changeStatusBookEmbeddableId(userBook) {
        return axios.patch(USER_BOOKS_API_BASE_URL + "status", userBook, {headers: headers})
    }
}

export default new UserBookService()