import axios from 'axios'; 
import { config } from '../config';

export async function getData(params, token){
    return await axios.get(`${config.api_host}/admin/departemen`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function saveData(data, token){
    return await axios.post(`${config.api_host}/admin/departemen/store`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function editData(data, token){
    return await axios.post(`${config.api_host}/admin/departemen/${data.id}/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function detailData(id, token){
    return await axios.get(`${config.api_host}/admin/departemen/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function deleteData(id, token){
    return await axios.delete(`${config.api_host}/admin/departemen/${id}/destroy`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}
