import request from '@/utils/request'

/**
 * 获取图片验证码
 * @param {Number} code 发起请求后的随机数
 * @returns pormise
 */
export const getImg = (code) => {
  return request({
    method: 'GET',
    url: `/user-service/user/imageCode/${code}`,
  })
}

/**
 * 登录
 * @param {Object} data loginName password code clientToken loginType
 * @returns promise
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/user-service/user/login',
    data,
  })
}
