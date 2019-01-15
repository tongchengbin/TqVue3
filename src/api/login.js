import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/api/admin/login/',
        method: 'post',
        data: {
            username,
            password
        }
    })
}


export function logout() {
    return request({
        url: '/api/user/logout',
        method: 'post'
    })
}
