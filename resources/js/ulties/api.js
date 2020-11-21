import Axios from 'axios';
import { resolve } from 'path';

export const register = (register_data) => {
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/register', register_data).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/login', {email, password}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const checkAuthenticatedToken = (access_token) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + access_token;
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/me').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}