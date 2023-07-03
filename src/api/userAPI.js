import axios from 'axios'; 
import { config } from '../config';


export async function getData(params, token){
    return await axios.get(`${config.api_host}/admin/user`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function getDataRole(params = {}, token){
    return await axios.get(`${config.api_host}/admin/role`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function saveData(data, token){
    return await axios.post(`${config.api_host}/admin/user/store`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function editData(data, token){
    return await axios.post(`${config.api_host}/admin/user/${data.id}/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function detailData(id, token){
    return await axios.get(`${config.api_host}/admin/user/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function deleteData(id, token){
    return await axios.delete(`${config.api_host}/admin/user/${id}/destroy`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}
