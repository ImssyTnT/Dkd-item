import { getImg, login } from '@/api'

export default {
  namespaced: true,
  state: {
    imgCode: '',
    img: '',
    token: '',
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
    setLogin(state, payload) {
      state.token = payload
    },
  },
  actions: {
    // 获取验证码图片
    async getImg(context) {
      try {
        const code = Math.floor(Math.random(0, 10) * 10)
        context.commit('setImgCode', code)
        const res = await getImg(code)
        // this.imgUrl = window.URL.createObjectURL(res.data)
        // const url = window.URL.createObjectURL(res.data)
        context.commit('setImg', res)
      } catch (error) {
        console.dir(error)
      }
    },
    // 登录功能
    async login(context, payload) {
      try {
        const res = await login(payload)
        context.commit('setLogin', res.token)
      } catch (error) {}
    },
  },
  getters: {},
}
