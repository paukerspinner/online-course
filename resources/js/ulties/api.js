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

export const checkAuthenticatedToken = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/me').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const requestUpLevel = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/users/up-level').then(res => {
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

export const getPendingTest = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/tests/pending-test').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const finishTest = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/tests/finish-test').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMyTests = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/tests/my-tests').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const updataTestAnswers = (test_answers) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/test-answers', {test_answers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getSections = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/sections').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMaterials = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/materials').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const addMaterial = material_data_form => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    Axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/materials', material_data_form).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMaterial = material_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/materials/${material_id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const updateMaterial = material_data_form => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    Axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/materials/update', material_data_form).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getRecommendedMaterials = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/materials/recommended-materials').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}