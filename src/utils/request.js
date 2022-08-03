// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
// 封装axios请求 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})
// 计算token是否过期
const timeout = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
// 请求拦截器
service.interceptors.request.use((config) => {
  // 判断vuex中是否有token
  if (store.state.user.token) {
    // 如果有token 判断token是否过期
    if (timeout()) {
      // token过期
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录失效'))
    } else {
      // token未过期
      config.headers.Authorization = `${store.state.user.token}`
    }
  }

  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 验证码响应特殊情况 单独响应
    const id = store.state.user.imgCode
    if (res.config.url === `/api/user-service/user/imageCode/${id}`) {
      return res.request.responseURL
    }
    const { success, msg, status } = res.data
    // 登录成功或失败返回信息 success 表示登陆成功或失败
    if (status || success) {
      return res.data
    }
    // 如果失败 提示用户失败原因并且抛出错误
    Message.error(msg)
    return Promise.reject(new Error(msg))
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.dir(error)
    console.dir(error)
    if (error?.response?.status === 401) {
      store.dispatch('user/logout')
      router.push('/login')
      Message.error(error.response.data)
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  },
)
export default service // 导出axios实例
