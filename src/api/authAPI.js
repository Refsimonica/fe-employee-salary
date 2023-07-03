import axios from 'axios'; 
import { config } from '../config';
let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

export async function login(email, password){
    return await axios.post(`${config.api_host}/admin/login`, {email, password});
}

export async function logout(){
    return await axios.post(`${config.api_host}/admin/logout`, null, {
        headers: { authorization: `Bearer ${token}` }
    }).then(response => {
        localStorage.removeItem('auth');
        return response;
    })
}

export async function profile(){
    return await axios.post(`${config.api_host}/admin/profile`, null, {
        headers: { authorization: `Bearer ${token}` }
    }).then(response => {
        // localStorage.removeItem('auth');
        return response;
    })
}