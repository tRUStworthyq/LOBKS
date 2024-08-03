import axios from "axios"

const USER_BOOKS_API_BASE_URL = "http://localhost:8080/api/user_books/"

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
    deleteUserBook(userBook2) {
        console.log(userBook2)
        return axios.delete("http://localhost:8080/api/user_books/del", userBook2, {headers: headers})
    }
}

export default new UserBookService()