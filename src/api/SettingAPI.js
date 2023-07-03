import axios from 'axios'; 
import { config } from '../config';

export async function getData(params, token){
    return await axios.get(`${config.api_host}/admin/setting`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function editData(data, token){
    return await axios.post(`${config.api_host}/admin/setting/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function detailData(name, token){
    return await axios.get(`${config.api_host}/admin/setting/${name}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

