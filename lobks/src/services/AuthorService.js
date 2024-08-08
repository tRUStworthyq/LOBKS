import axios from "axios";

const AUTHORS_API_BASE_URL = "http://localhost:8082/api/authors/"

const headers = {
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
}

class AuthorService {

    getAuthorById(id) {
        return axios.get(AUTHORS_API_BASE_URL + "author/" + id, {headers: headers})
    }

    getAllAuthors() {
        return axios.get(AUTHORS_API_BASE_URL, {headers: headers})
    }

    createAuthor(author) {
        return axios.post(AUTHORS_API_BASE_URL + "create", author, {headers: headers})
    }

    updateAuthor(author) {
        return axios.put(AUTHORS_API_BASE_URL + "update", author, {headers: headers})
    }
    deleteAuthor(id) {
        return axios.delete(AUTHORS_API_BASE_URL + id, {headers: headers})
    }

}
export default new AuthorService()