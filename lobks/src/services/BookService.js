import axios from "axios"

const BOOK_API_BASE_URL = "http://localhost:8080/"



class BookService {

    getBooks(){
        return axios.get(BOOK_API_BASE_URL);
    }

    createBook(book){
        return axios.post(BOOK_API_BASE_URL + 'create', book)
    }

    getBookById(id){
        return axios.get(BOOK_API_BASE_URL + 'book/' + id)
    }

    updateBook(book){
        return axios.put(BOOK_API_BASE_URL + 'update', book)
    }
    
    deleteBook(id){
        return axios.delete(BOOK_API_BASE_URL + id)
    }

}

export default new BookService()