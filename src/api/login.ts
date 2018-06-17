import api from './ajax'
const LOGIN_URL = '/api/login'
export const loginApi = {
  login: function login({username, password}:{username:string, password:string}) {
    return api.get(LOGIN_URL, {password, username});
  }
}