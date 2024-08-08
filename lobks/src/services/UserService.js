import axios from "axios"

const USERS_API_BASE_URL = "http://localhost:8082/api/users/"

const headers = {
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
}

class UserService {

    findAllUsers() {
        return axios.get(USERS_API_BASE_URL, {headers: headers})
    }

    findUserByUsername(username) {
        return axios.get(USERS_API_BASE_URL + username, {headers: headers})
    }

    findUserById(id) {
        return axios.get(USERS_API_BASE_URL + "id/" + id, {headers: headers})
    }

    findUsersByStatusUser(userSearch) {
        return axios.post(USERS_API_BASE_URL + "search", userSearch, {headers: headers})
    }

    updateStatusUserByUsername(username) {
        return axios.patch("http://localhost:8082/api/users/status/" + username,{}, {headers: headers})
    }
}
export default new UserService()
