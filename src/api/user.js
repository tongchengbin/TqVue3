import request from '@/utils/request'



export function getInfoData() {
    const params={};
    return request({
        url: '/api/admin/user/info/',
        method: 'get',
        params
    })
}
export function logout() {
  return request({
    url: '/api/admin/logout/',
    method: 'get'
  })
}

