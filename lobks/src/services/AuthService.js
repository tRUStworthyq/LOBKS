import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/auth/"

class AuthService {


    signIn(signInObject) {
        return axios.post(AUTH_API_BASE_URL + "signin", signInObject)
    }
    signUp(signUpObject) {
        return axios.post(AUTH_API_BASE_URL + "signup", signUpObject)
    }
}
export default new AuthService()