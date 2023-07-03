import axios from 'axios'; 
import { config } from '../config';

export async function getData(params, token){
    return await axios.get(`${config.api_host}/admin/absensi`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }}).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.response;
        } else {
            return error;
        }
    });
}

export async function saveData(data, token){
    return await axios.post(`${config.api_host}/admin/absensi/import`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }}).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.response;
        } else {
            return error;
        }
    });
}

export async function editData(data, token){
    return await axios.post(`${config.api_host}/admin/absensi/${data.id}/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }}).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.response;
        } else {
            return error;
        }
    });
}

export async function detailData(id, token){
    return await axios.get(`${config.api_host}/admin/absensi/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }}).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.response;
        } else {
            return error;
        }
    });
}

export async function deleteData(id, token){
    return await axios.delete(`${config.api_host}/admin/absensi/${id}/destroy`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }}).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.response;
        } else {
            return error;
        }
    });
}

export async function updateAbsentDays(data, token) {
    return await axios.post(`${config.api_host}/admin/absensi/update_absent`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization': `Bearer ${token}`
        }
    }).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.request;
        } else {
            return error;
        }
    });
}

export async function updateOvertime(data, token) {
    return await axios.post(`${config.api_host}/admin/absensi/update_overtime`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization': `Bearer ${token}`
        }
    }).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.request;
        } else {
            return error;
        }
    });
}

export async function updateAbsentDetail(data, token) {
    return await axios.post(`${config.api_host}/admin/absensi/update_absent_detail`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization': `Bearer ${token}`
        }
    }).catch(function (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return error.request;
        } else {
            return error;
        }
    });
}
