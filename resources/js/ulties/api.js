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

export const changePassword = (password, new_password, confirm) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/change-password', {password, new_password, confirm}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const logout = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/logout').then(res => {
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

export const requestDownLevel = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/users/down-level').then(res => {
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

export const getFailModulesInExam = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/materials/fail-modules-in-exam').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getBlogs = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/blogs').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getBlog = (blog_id) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/blogs/${blog_id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const postBlogs = (title, content) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/blogs', { title, content }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}


export const deleteBlog = id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.delete(`/api/v1/blogs/${id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}


export const getCommentsOfBlog = blog_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/blogs/${blog_id}/comments`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const postCommentToBlog = (blog_id, comment) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post(`/api/v1/blogs/${blog_id}/comments`, { comment }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const deleteComment = cmt_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.delete(`/api/v1/comments/${cmt_id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const postNotificationsSendAll = (title, content) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.post('/api/v1/notifications/send-all', { title, content }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMyNotifications = params => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/my-notifications', { params }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMyNotification = id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/my-notifications/${id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const updateMyNotification = (id, data) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.put(`/api/v1/my-notifications/${id}`, data).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getUsers = filter_conditions => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/users', { params: filter_conditions}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
export const deleteUsers = user_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.delete(`/api/v1/users/${user_id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getTranscript = user_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/transcripts/${user_id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMyTranscript = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/transcripts/mine').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getProfile = user_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/profiles/${user_id}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const updateProfile = (user_id, data) => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.put(`/api/v1/profiles/${user_id}`, data).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getMyself = () => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get('/api/v1/users/myself').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getTestsOfUser = user_id => {
    Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v1/users/${user_id}/tests`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}