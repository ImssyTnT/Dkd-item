import request from '@/utils/request'

/**
 * 获取用户基本信息
 * @param {Number} id 用户id
 * @returns promise
 */
export function getUserInfoApi(id) {
  return request({
    method: 'GET',
    url: `/user-service/user/${id}`,
  })
}

export function logout() {}
