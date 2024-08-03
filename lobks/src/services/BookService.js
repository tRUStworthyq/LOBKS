import axios from "axios"

const BOOK_API_BASE_URL = "http://localhost:8080/api/books/"

const headers = {
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
}

class BookService {


    getAllBooks(){
        return axios.get(BOOK_API_BASE_URL, {headers: headers});
    }

    createBook(book){
        return axios.post(BOOK_API_BASE_URL + 'create', book, {headers: headers})
    }

    getBookById(id){
        return axios.get(BOOK_API_BASE_URL + 'book/' + id, {headers: headers})
    }

    updateBook(book){
        return axios.put(BOOK_API_BASE_URL + 'update', book, {headers: headers})
    }
    
    deleteBook(id){
        return axios.delete(BOOK_API_BASE_URL + id, {headers: headers})
    }
    getAllBooksByAuthorId(id) {
        return axios.get(BOOK_API_BASE_URL + "all/" + id, {headers: headers})
    }

}

export default new BookService()