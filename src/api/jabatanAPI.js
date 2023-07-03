import axios from 'axios'; 
import { config } from '../config';


export async function getData(params, token){
    return await axios.get(`${config.api_host}/admin/jabatan`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function getDataDepartment(params = {}, token){
    return await axios.get(`${config.api_host}/admin/departemen`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function saveData(data, token){
    return await axios.post(`${config.api_host}/admin/jabatan/store`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function editData(data, token){
    return await axios.post(`${config.api_host}/admin/jabatan/${data.id}/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function detailData(id, token){
    return await axios.get(`${config.api_host}/admin/jabatan/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function deleteData(id, token){
    return await axios.delete(`${config.api_host}/admin/jabatan/${id}/destroy`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}
