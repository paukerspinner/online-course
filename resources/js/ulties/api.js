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


export const addNewQuestion = (question, answers) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/questions', { question, answers }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const editQuestion = (question, answers, question_id) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.put(`/api/v1/questions/${question_id}`, { question, answers }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getQuestion = (id) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/questions/${id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getQuestions = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/questions').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const makeTest = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/tests/make-test').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}