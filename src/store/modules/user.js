import { getImg, login, getUserInfoApi } from '@/api'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    imgCode: '',
    img: '',
    token: '',
    userId: '',
    userInfo: {},
  },
  mutations: {
    // 设置获取图片请求的随机数
    setImgCode(state, payload) {
      state.imgCode = payload
    },
    // 设置获取图片请求返回的图片路径
    setImg(state, payload) {
      state.img = payload
    },
    // 设置请求返回信息和token
    setToken(state, payload) {
      state.token = payload
    },
    // 设置用户id
    setUserId(state, payload) {
      state.userId = payload
    },
    // 设置用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 获取验证码图片
    async getImg(context) {
      const code = Math.floor(Math.random(0, 10) * 10)
      context.commit('setImgCode', code)
      const res = await getImg(code)
      // this.imgUrl = window.URL.createObjectURL(res.data)
      // const url = window.URL.createObjectURL(res.data)
      context.commit('setImg', res)
    },
    // 登录功能
    async login(context, payload) {
      try {
        const res = await login(payload)
        context.commit('setToken', res.token)
        context.commit('setUserId', res.userId)
        setTokenTime()
      } catch (error) {}
    },
    // 获取用户基本信息
    async getUserInfo(context, payload) {
      const res = await getUserInfoApi(payload)
      context.commit('setUserInfo', res)
    },
    // 退出功能
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserId', '')
      context.commit('setUserInfo', {})
    },
  },
  getters: {},
}
